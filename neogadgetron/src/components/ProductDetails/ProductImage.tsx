import React from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  onClick?: () => void;
  className?: string;
  height?: string | number;
  width?: string | number;
}

export const ProductImage: React.FC<ProductImageProps> = ({
  src,
  alt,
  onClick,
  className = "",
  height = "400px",
  width = "100%",
}) => (
  <div
    onClick={onClick}
    className={`overflow-hidden rounded ${className}`}
    style={{ width, height }}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);