import { useState, useEffect } from 'react';

const trimCache = new Map();

export default function TrimmedImage({ src, alt, className, loading }) {
  const [imgSrc, setImgSrc] = useState(trimCache.get(src) || '');
  const [loaded, setLoaded] = useState(!!trimCache.get(src));

  useEffect(() => {
    if (!src) return;
    
    // Reset state if src changes and is not in cache
    if (!trimCache.has(src)) {
      setLoaded(false);
    }

    if (trimCache.has(src)) {
      setImgSrc(trimCache.get(src));
      setLoaded(true);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'anonymous'; // Important to avoid CORS issues when reading canvas data
    
    img.onload = () => {
      const processImage = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          ctx.drawImage(img, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;
          
          let top = null, bottom = null, left = null, right = null;
          
          // Scan the image for non-transparent pixels
          for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
              const alpha = data[(y * canvas.width + x) * 4 + 3];
              if (alpha > 5) {
                if (top === null) top = y;
                bottom = y;
                if (left === null || x < left) left = x;
                if (right === null || x > right) right = x;
              }
            }
          }
          
          if (top !== null && bottom !== null && left !== null && right !== null) {
            const trimWidth = right - left + 1;
            const trimHeight = bottom - top + 1;
            
            const trimCanvas = document.createElement('canvas');
            trimCanvas.width = trimWidth;
            trimCanvas.height = trimHeight;
            const trimCtx = trimCanvas.getContext('2d');
            
            trimCtx.drawImage(
              canvas,
              left, top, trimWidth, trimHeight,
              0, 0, trimWidth, trimHeight
            );
            
            const dataUrl = trimCanvas.toDataURL('image/png');
            trimCache.set(src, dataUrl);
            setImgSrc(dataUrl);
          } else {
            trimCache.set(src, src);
            setImgSrc(src);
          }
        } catch (e) {
          console.error('Error auto-trimming image:', e);
          trimCache.set(src, src);
          setImgSrc(src);
        }
        setLoaded(true);
      };

      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(processImage, { timeout: 1000 });
      } else {
        setTimeout(processImage, 0);
      }
    };
    
    img.onerror = () => {
      trimCache.set(src, src);
      setImgSrc(src);
      setLoaded(true);
    };
    
    img.src = src;
  }, [src]);

  return (
    <img
      src={imgSrc || src}
      alt={alt}
      className={`${className} ${loaded ? 'opacity-100' : 'opacity-0'}`}
      loading={loading}
    />
  );
}
