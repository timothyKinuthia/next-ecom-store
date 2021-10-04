import React from 'react';
import Loader from "react-loader-spinner";

const Loading = ({type, color, height, width}) => {
    return (
        <Loader
        type={type}
        color={color}
        height={height}
        width={width}
        timeout={3000} //3 secs
      />
    )
}

export default Loading;
