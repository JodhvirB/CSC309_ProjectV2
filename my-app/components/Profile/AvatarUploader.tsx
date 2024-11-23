
import React, { useState } from 'react';

interface AvatarUploaderProps {
  avatarUrl: string;
  onUpdate: (newAvatar: string) => void;
}

const AvatarUploader: React.FC<AvatarUploaderProps> = ({ avatarUrl, onUpdate }) => {
  const [preview, setPreview] = useState<string>(avatarUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          setPreview(reader.result.toString());
          onUpdate(reader.result.toString()); // Convert to base64
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <img
        src={preview}
        alt="Avatar Preview"
        className="w-32 h-32 rounded-full object-cover border"
      />
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mt-2"
      />
    </div>
  );
};

export default AvatarUploader;
