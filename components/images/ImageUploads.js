import React, { useState, useRef } from "react";
import { postDataApi } from "../../utils/functions";
import Loading from "../loaders/Loading";
import { imageResizer } from "./imageResizer";
import { useToasts } from "react-toast-notifications";
import Image from "next/image";

const ImageUploads = ({ prodImgs, setProdImgs }) => {
  const [images, setImages] = useState([]);
  const [imagefiles, setImagefiles] = useState([]);
  const [loading, setLoading] = useState(false);

  //toast
  const { addToast } = useToasts();

  //ref
  const hiddenInput = useRef(null);
  const handleHiddenInput = () => {
    hiddenInput.current.click();
  };

  const handleImageChange = async (evt) => {
    const files = evt.target.files;
    setImagefiles(files);
    imageResizer(files, setImages);
  };

  const handleImageUpload = async () => {
    try {
      if (images.length === 0) {
        addToast("No files choosen yet", { appearance: "error" });
        return;
      }
      setLoading(true);
      const res = await postDataApi("product/cloudinary", {
        imagefiles: images,
      });
      setProdImgs(res.data.imgs);
      setLoading(false);
      setImages([]);
      setImagefiles([]);
    } catch (err) {
      setLoading(false);
      addToast(err.response.data.msg, { appearance: "error" });
    }
  };
  return (
    <>
      <div className="flex flex-col space-y-2 text-sm sm:text-base">
        <div className="flex">
          <div className="flex flex-col space-y-4">
            <span
              onClick={handleHiddenInput}
              className="font-bold p-2 border cursor-pointer"
            >
              Choose Files{" "}
              <span className="ml-1 text-light">{imagefiles.length}</span>
            </span>
            <input
              className="hidden"
              type="file"
              accept="images/*"
              multiple
              ref={hiddenInput}
              onChange={handleImageChange}
            />
            <span
              type="submit"
              onClick={handleImageUpload}
              className={`border p-2 bg-gray-800 hover:bg-gray-900 text-white text-center font-bold ${
                loading ? "pointer-events-none" : "cursor-pointer"
              }`}
            >
              {loading ? "Uploading..." : "Upload"}
            </span>
          </div>
          <div className="mx-4 flex-1 grid grid-cols-3 sm:grid-cols-6 gap-2">
            {loading ? (
              <div className="col-span-3 sm:col-span-6 flex justify-center items-center">
                <Loading type="Puff" color="#00ffdf" height={50} width={50} />
              </div>
            ) : (
              prodImgs.length > 0 &&
              prodImgs.map((img) => (
                <Image
                  key={img.public_id}
                  src={img.url}
                  alt=""
                  width={20}
                  height={20}
                  quality={100}
                  layout="responsive"
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageUploads;
