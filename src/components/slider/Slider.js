import React, { useEffect, useState } from 'react'     // Slider in jsx i
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai"
import { sliderData } from './slider-data' // verileri aldığım dosyayı import ettim
import "./Slider.scss"

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0) // Bu state her zaman ilk index e karşılık gelecek
    const slideLenght = sliderData.length;
    console.log(slideLenght);

    const autoScroll = true
    let slideInterval;
    let intervalTime = 5000

    const nextSlide = () => { //sonrali slide a geçiş
        setCurrentSlide(currentSlide === slideLenght - 1 ? 0 : currentSlide + 1); // son slide a geldiyse ilk elemana dönüyor diğer durumda bir sonrakine geçiş yapıyor
    };
    const prevSlide = () => { // önceki slide a geçiş
        setCurrentSlide(currentSlide === 0 ? slideLenght - 1 : currentSlide - 1); // ilk slide da ise son elemana dönüyor diğer durumda bir öncekine geçiş yapıyor
    };

    useEffect(() => {
        setCurrentSlide(0) // sayfa yenilendiğinde ilk slide açılacak

    }, [])

    // const auto = () => { // slider in oto geçiş yapması
    //    slideInterval = setInterval(nextSlide, intervalTime) //next slide a 5 saniye sonra geçiş
    //}

    useEffect(() => {
        if(autoScroll) {
            const auto = () => { // slider in oto geçiş yapması
                slideInterval = setInterval(nextSlide, intervalTime) //next slide a 5 saniye sonra geçiş
            };
            auto();
        }
        return () => clearInterval(slideInterval); // elle slider değiştiyse 5 sn sonra kendi geçmesi için cleanup yaptım aniden değişimi önlüyor
    }, [currentSlide, slideInterval, autoScroll])

  return (
    <div className='slider'>
        <AiOutlineArrowLeft className='arrow prev' onClick={prevSlide}/> {/* slider in sol oku */}
        <AiOutlineArrowRight className='arrow next' onClick={nextSlide}/> {/* sağ ok */}

        {sliderData.map((slide, index) => { // Data mı mapladim
            const {image, heading, desc} = slide // Gereken propertileri çektim
            return (
            <div key={index} className={index === currentSlide ? "slide current" : "slide"}>{/*css değiştirme*/}

                {index === currentSlide && ( // Değer sağlanıyorsa aşağıdaki gösterilecek
                    <>
                        <img src={image} alt="slide" /> {/* Background */}
                        <div className='content'> 
                            <h2>{heading}</h2> {/* Başlık propertisi */}
                            <p>{desc}</p>{/* Tanım propertisi */}
                            <hr />
                            <a href="#product" className='--btn --btn-primary'> {/* buton */}
                                Shop Now
                            </a>
                        </div>
                    </>
                )}
            </div>

            )
        })}

    </div>
  )
}

export default Slider