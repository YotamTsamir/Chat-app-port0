import { useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { logout } from "../firebase/auth";
import { updateProfile } from "firebase/auth";
import { DEFAULT_IMG } from "../consts/ChatConsts";

const UserMenu = () => {
  const user = useUser();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const photoURL = user?.photoURL || DEFAULT_IMG;

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-avatar-upload");

    const cloudName = "dlspqjai1";

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();
      const url = data.secure_url;

      if (!url) {
        console.error("Upload failed:", data);
        return;
      }

      await updateProfile(user, { photoURL: url });
      await user.reload(); // ✅ refresh to make sure it's updated
      setOpen(false);
    } catch (err) {
      console.error("Upload error:", err);
    }
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
