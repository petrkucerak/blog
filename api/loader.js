export const cloudflareImageLoader = ({ src, width, quality }) => {
  if (!quality) {
    quality = 75;
  }
  return `https://images.next-image-resize.workers.dev?width=${width}&quality=${quality}&image=https://next-image-resize${src}`;
};
