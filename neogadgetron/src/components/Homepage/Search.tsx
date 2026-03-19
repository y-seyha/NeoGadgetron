import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { createPortal } from "react-dom";

import { Search as SearchIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";

type Product = {
  id: number;
  name: string;
  image_url: string;
};

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  //  Handle debounce properly
  useEffect(() => {
    const delay = setTimeout(() => {
      if (!query) {
        setResults([]);
        return;
      }

      const fetch = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            `http://localhost:3000/api/v1/products/search?search=${encodeURIComponent(
              query,
            )}`,
          );
          setResults(res.data.products || []);
        } catch (err: unknown) {
          if (axios.isAxiosError(err)) {
            console.log(err.response?.data);
          } else {
            console.log(err);
          }
        } finally {
          setLoading(false);
        }
      };

      fetch();
    }, 300);

    return () => clearTimeout(delay);
  }, [query]);

  //  Calculate position
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [query, results]);

  //  Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setQuery("");
        setResults([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      <Input
        placeholder="Search products..."
        className="pl-9 w-full"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* ✅ Portal dropdown */}
      {query &&
        createPortal(
          <div
            className="fixed bg-white dark:bg-gray-800 border rounded shadow z-9999"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
            }}
          >
            {loading ? (
              <div className="p-2 text-sm text-gray-500">Loading...</div>
            ) : results.length > 0 ? (
              <ul className="max-h-60 overflow-auto">
                {results.map((product) => (
                  <li
                    key={product.id}
                    onClick={(e) => {
                      e.stopPropagation(); // 🔥 FIX
                      navigate(`/products/${product.id}`);
                      setQuery("");
                      setResults([]);
                    }}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="h-6 w-6 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-2 text-sm text-gray-500">No results found.</div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
