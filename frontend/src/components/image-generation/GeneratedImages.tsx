import React from "react";
import { useLoaderStore, useImageStore } from "@/lib/store/useLoaderStore";
import Loader from "@/components/loader";
import Image from "next/image";

const GeneratedImages = () => {
  const { isLoading, setIsLoading } = useLoaderStore();
  const { image, setImage } = useImageStore();
  console.log("generated image: ", image);
  if (image.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center border-2 m-30 w-3/4 h-3/4 bg-gray-200">
        No images generated
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center border-2 m-30 w-3/4 h-3/4 bg-gray-200">
        {image && image !== "Failed to generate image" ? (
          <Image src={image} alt="Generated" width={300} height={300} />
        ) : isLoading ? (
          <Loader />
        ) : (
          "Output images"
        )}
      </div>
    );
  }
};

export default GeneratedImages;
