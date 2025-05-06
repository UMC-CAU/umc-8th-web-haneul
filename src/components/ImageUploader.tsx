import { useEffect, useRef } from 'react';

const ImageUploader = ({ onChange }: { onChange: (file: File) => void }) => {
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const previewImageRef = useRef<HTMLImageElement | null>(null);

  const defaultImage =
    'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg'; // 기본 이미지 URL

  useEffect(() => {
    if (previewImageRef.current) {
      previewImageRef.current.src = defaultImage;
    }
  }, []);

  return (
    <>
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => {
          // console.log(e);
          const file = e.target.files?.[0];
          if (file && previewImageRef.current) {
            previewImageRef.current.src = URL.createObjectURL(file);
            onChange(file);
          }
        }}
        className="hidden"
      />

      <div className="group relative">
        <img
          ref={previewImageRef}
          alt="Uploaded Preview"
          className="aspect-square w-full rounded-full border border-gray-300 object-cover group-hover:blur-sm"
        />
        <button
          className="absolute inset-0 flex items-center justify-center rounded-full bg-black text-sm font-semibold text-white opacity-0 group-hover:opacity-40"
          onClick={() => imageInputRef.current?.click()}
        >
          클릭해서 이미지 변경
        </button>
      </div>
    </>
  );
};

export default ImageUploader;
