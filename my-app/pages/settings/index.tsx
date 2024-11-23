import React, { useEffect, useState } from 'react';
import { fetchUserProfile, updateUserProfile } from '@/utils/api';
import AvatarUploader from '@/components/Profile/AvatarUploader';
import UserProfile from '@/components/Profile/UserProfile';

const Settings: React.FC = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const loadProfile = async () => {
      const data = await fetchUserProfile();
      setProfile(data);
    };
    loadProfile();
  }, []);

  const handleUpdate = async (field: string, value: string) => {
    const updatedProfile = await updateUserProfile({ [field]: value });
    setProfile(updatedProfile.user);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <AvatarUploader
        avatarUrl={profile.avatar || '/default-avatar.png'}
        onUpdate={(newAvatar) => handleUpdate('avatar', newAvatar)}
      />
      <UserProfile profile={profile} onUpdate={handleUpdate} />
    </div>
  );
};

export default Settings;


