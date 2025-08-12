import React, { useRef,useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

const ProfilePhotoSelector = ({ image, setImage }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }

    // Generate  Preview URL
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center items-center flex-col gap-2 mb-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-24 h-24 rounded-full bg-blue-200/50 flex justify-center items-center cursor-pointer relative">
          <LuUser size={25} className="text-[30px] text-primary cursor-pointer"/>
          <button type="button" onClick={onChooseFile} className="w-8 h-8 bg-primary cursor-pointer text-white rounded-full flex justify-center items-center absolute bottom-0 right-0">
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={previewUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-primary border-1"
          />
          <button onClick={onChooseFile} className="w-8 h-8 bg-primary text-white rounded-full flex justify-center items-center absolute bottom-0 right-0">
            <LuUpload size={25} className="text-[30px] text-primary cursor-pointer" />
          </button>
          <button type="button" className="w-8 h-8 cursor-pointer bg-primary text-white rounded-full flex justify-center items-center absolute bottom-0 right-0" onClick={handleRemoveImage}>
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
