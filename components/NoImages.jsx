import React from "react";
import Image from "next/image"; 

const NoImages = () => {
  return (
    <div className="flex items-center space-x-4">
      <h1 className="text-3xl">No Images Found</h1>
      <Image
        src="/images/broken-image.png" // Path to your broken-image.png
        alt="No Images Found"
        width={40} // Adjust size as needed
        height={40}
      />
    </div>
  );
};

export default NoImages;
