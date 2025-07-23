import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { logout } from "../firebase/auth";
import { updateProfile } from "firebase/auth";
import { DEFAULT_IMG } from "../consts/ChatConsts";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";
import { resizeImageToBlob } from "../utils";

const UserMenu = () => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoURL = user?.photoURL || DEFAULT_IMG;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const blob = await resizeImageToBlob(file)

    const storageRef = ref(storage, `avatars/${user.uid}.jpg`);
    await uploadBytes(storageRef, blob);

    const url = await getDownloadURL(storageRef);

    await updateProfile(user, { photoURL: url });
    await user.reload();
    setOpen(false);
  };

  return (
    <div className="user-menu">
      <img
        src={photoURL}
        alt="User Avatar"
        className="user-avatar"
        onClick={() => setOpen(!open)}
      />

      {open && (
        <div className="user-dropdown">
          <div
            className="user-dropdown-item"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Profile Picture
          </div>
          <div className="user-dropdown-item" onClick={logout}>
            Logout
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleUpload}
      />
    </div>
  );
};

export default UserMenu;
