import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from 'react' // ürün eklemenin jsx i
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../../firebase/config';
import Card from '../../card/Card';
import Loader from '../../loader/Loader';
import styles from "./AddProduct.module.scss"

const categories = [ // kategori array şeklinde objelerden oluşuyor
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
]

const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
}

const AddProduct = () => {
  const [product, setProduct] = useState({
    ...initialState
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // loader componenti için

  const navigate = useNavigate()


  const handleInputChange = (e) => { // form inputlarını işlemek için
    const {name, value} = e.target
    setProduct({...product, [name]:value}) // product nesnesinin eski tüm değerini alıp değişiklik yapma
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    //console.log(file);

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`); // klasör oluşturup resmi kaydediyor
    const uploadTask = uploadBytesResumable(storageRef, file);


    uploadTask.on('state_changed',   // firebase e ait resim yükleme işi
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(progress)
    }, 
    (error) => {
      toast.error(error.message)
    }, 
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setProduct({...product, imageURL: downloadURL})
        toast.success("Image uploaded successfully.")
      });
    }
  );
  };


  const addProduct = (e) => {
    e.preventDefault()
    // console.log(product);
    setIsLoading(true)

    try{
      const docRef = addDoc(collection(db, "products"), { // veritabanına form verilerini kaydetme fonksiyonu
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate()
      });
      setIsLoading(false)
      setUploadProgress(0)
      setProduct({ ...initialState }) // form içeriğini temizlemek için

      toast.success("Product uploaded successfully.")
      navigate("/admin/all-products") // ürünler sayfasına gönderiyor
    } catch (error){
      setIsLoading(false)
      toast.error(error.message)
    }
  };


  return (
    <>
    {isLoading && <Loader/>} {/* True ise Loader componentini gösteriyor */}
    <div className={styles.product}>
      <h1>Add New Product</h1>
      <Card cardClass={styles.card}>
        <form onSubmit={addProduct}>
        <label>Product Name:</label>
        <input 
          type="text" 
          placeholder='Product Name' 
          required 
          name='name' 
          value={product.name} 
          onChange={(e) => handleInputChange(e)} 
        />

        <label>Product Image:</label>

        <Card cardClass={styles.group}>

          {uploadProgress === 0 ? null : ( // progress bar yükleme gözükmesi
            <div className={styles.progress}>

            <div className={styles["progress-bar"]} style={{width: `${uploadProgress}%`}}>
              {uploadProgress < 100 ? `Uploading ${uploadProgress}` : `Upload Complete ${uploadProgress}%`}
            </div>
          </div>
          )}
          

          <input 
            type="file" 
            accept='image/*' 
            placeholder='Product Image' 
            name='image' 
            onChange={(e) => handleImageChange(e)} 
          />

          {product.imageURL === "" ? null : (
            <input 
            type="text" 
            //required 
            placeholder='Image URL'
            name='imageURL' 
            value={product.imageURL} 
            disabled
          />
          )}
          
        </Card>

        <label>Product Price:</label>
        <input 
          type="number" 
          placeholder='Product Price' 
          required 
          name='price' 
          value={product.price} 
          onChange={(e) => handleInputChange(e)} 
        />

        <label>Product Category:</label>
        <select required name="category" value={product.category} onChange={(e) => handleInputChange(e)} >
          <option value="" disabled>
            -- choose product category --
          </option>
          {categories.map((cat) => {
            return (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            )
          })}
        </select>

        <label>Product Company/Brand:</label>
        <input 
          type="text" 
          placeholder='Product brand' 
          required 
          name='brand' 
          value={product.brand} 
          onChange={(e) => handleInputChange(e)} 
        />

        <label>Product Description:</label>
        <textarea 
          name="desc" 
          required 
          value={product.desc} 
          onChange={(e) => handleInputChange(e)} 
          cols="30" 
          rows="10"
        ></textarea>

        <button className='--btn --btn-primary'>Save Product</button>
        </form>
      </Card>
    </div>
    </>
    
  )
}

export default AddProduct