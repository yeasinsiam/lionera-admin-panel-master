import React, { useState} from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
function Gallery(props){
    const {gallery}=props
    console.log(gallery)
  
    return(<div>
         <Carousel>
                {gallery.map((item,key)=>{
                    return(<div key={key}>
                        <img src={item.url} alt="images" className="galleryImage"/>
                    </div>)
                })}
            </Carousel>
    </div>)
}

export default Gallery;