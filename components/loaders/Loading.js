import React from 'react';
import Loader from "react-loader-spinner";

const Loading = ({type, color, height, width}) => {
    return (
        <Loader
        type={type}
        color={color}
        height={height}
        width={width}
      />
    )
}

export default Loading;
