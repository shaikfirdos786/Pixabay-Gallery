"use client";

import { useEffect, useState } from "react";
import ImageCard from "@/components/ImageCard";
import ImageSearch from "@/components/ImageSearch";
import LoadingIndicator from "@/components/UI/LoadingIndicator";
import NoImages from "@/components/NoImages";

export default function Home() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchImagesData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API}&q=${searchTerm}&image_type=photo&pretty=true`
        );
        const data = await response.json();
        if (data.hits && data.hits.length > 0) {
          setImages(data.hits);
        } else {
          setImages([]);
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImagesData();
  }, [searchTerm]);

  return (
    <div className="container px-4 sm:px-0 sm:mx-auto flex flex-col items-center min-h-screen">
      <ImageSearch searchText={setSearchTerm} />
      {!isLoading && images.length === 0 && <NoImages />}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}
