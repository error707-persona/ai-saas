"use client";

import Configuration from "@/components/image-generation/Configurations";
import GeneratedImages from "@/components/image-generation/GeneratedImages";
import React from "react";

const ImageGeneration = () => {
  return (
    <section className="container mx-auto grid gap-4 grid-cols-6 overflow-hidden">
      <div className="col-span-3">
        <Configuration />
      </div>

      <div className="col-span-3 p-4  rounded-xl flex flex-col items-center justify-center">
        <GeneratedImages />
      </div>
    </section>
  );
};

export default ImageGeneration;
