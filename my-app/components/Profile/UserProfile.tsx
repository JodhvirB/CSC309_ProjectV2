import React, { useState } from 'react';

interface UserProfileProps {
  profile: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    avatar: string;
  };
  onUpdate: (field: string, value: string) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ profile, onUpdate }) => {
  const [editMode, setEditMode] = useState<string | null>(null);

  const handleUpdate = (field: string, value: string) => {
    onUpdate(field, value);
    setEditMode(null); // Exit edit mode
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold">Profile</h3>
        <p className="text-gray-500">Manage your profile information.</p>
      </div>
      {['firstName', 'lastName', 'email', 'phoneNumber'].map((field) => (
        <div key={field} className="flex items-center justify-between">
          <div>
            <p className="text-gray-600">{field.replace(/([A-Z])/g, ' $1')}</p>
            <p className="font-medium">
              {editMode === field ? (
                <input
                  type="text"
                  defaultValue={(profile as any)[field]}
                  onBlur={(e) => handleUpdate(field, e.target.value)}
                  autoFocus
                  className="p-2 border rounded-md"
                />
              ) : (
                (profile as any)[field]
              )}
            </p>
          </div>
          <button
            onClick={() => setEditMode(editMode === field ? null : field)}
            className="text-blue-500 hover:underline"
          >
            {editMode === field ? 'Cancel' : 'Edit'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default UserProfile;