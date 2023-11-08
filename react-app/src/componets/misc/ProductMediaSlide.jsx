import { useEffect } from "react";
import { useState } from "react";

import './style/ProductMediaSlide.css'

export default function ProductMediaSlide({ product }) {
    const medias = product.medias
    const [currentImage, setCurrentImage] = useState(medias[0])
    useEffect(() => {
        setCurrentImage(medias[0])
    }, [])
    return (
        <div id='ProductMediaSlide'>
            <div id='ProductMediaSlide-d1'>
                <img id='ProductMediaSlide-d1i1' src={currentImage.url}/>
            </div>
            <div id='ProductMediaSlide-d2'>
                {
                    medias.map((media, idx) => {
                        return (
                            <div className="ProductMediaSlide-divlist" key={"media"+idx} onMouseEnter={(e) => setCurrentImage(media)}>
                                <img className="ProductMediaSlide-imglist" src={media.url} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
