import React from 'react';
import Image from 'next/image';

const ProductItem = ({ product }) => {
    return (
        <div className="p-2 max-w-lg mx-auto space-y-1">
            <img className="w-full h-96 object-cover" src={product.images[0].url} alt={product.title} />
            <div className="text-sm text-gray-500">{product.title}</div>
            <div className="text-gray-400 text-sm">In Stock: {" "}{product.inStock} </div>
            <div className="font-semibold text-gray-700">$ {product.price}</div>
        </div>
    )
}

export default ProductItem;
