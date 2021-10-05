import React, { useState } from 'react'
import ImageUploads from '../../components/images/ImageUploads'

const ProductCreate = () => {
    const initialState = {
        
    }
    const [previewImgs, setPreviewImages] = useState([]);
    

    return (
        <div>
            <ImageUploads/>
           
        </div>
    )
}

export default ProductCreate
