import React, { useState } from 'react';
import { postDataApi } from '../../utils/functions';
import { imageResizer } from './imageResizer';

const ImageUploads = () => {
    const [images, setImages] = useState([]);

    const handleImageChange = async (evt) => {
        const files = evt.target.files;
        imageResizer(files, setImages);
    }

    const handleImageSubmit = async (evt) => {
        evt.preventDefault();

        const res = await postDataApi("product/cloudinary", { imagefiles: images });

        console.log(res.data);
    }
    return (
        <form onSubmit={handleImageSubmit}>
            <input type="file" accept="images/*" multiple onChange={handleImageChange} />
            <button type="submit" className="border py-1 px-2">Submit</button>
        </form>
    )
}

export default ImageUploads
