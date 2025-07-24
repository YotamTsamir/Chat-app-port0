import { useEffect, useRef, useState } from "react";
import { useUser } from "../context/UserContext";
import { logout } from "../firebase/auth";
import { handleUpload } from "../utils";
import AuthModal from "./AuthModal";
import { DEFAULT_IMG } from "../consts/ChatConsts";

const UserMenu = () => {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [user]);

  const isLoggedIn = !!user && !user.isAnonymous;

  const photoURL = user?.photoURL || DEFAULT_IMG;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    await handleUpload(file, user);
    setOpen(false);
  };

  return (
    <>
      <div className="user-menu">
        <img
          src={photoURL}
          alt="User Avatar"
          className="user-avatar"
          onClick={() => setOpen((prev) => !prev)}
        />

        {open && (
          <div className="user-dropdown">
            {isLoggedIn ? (
              <>
                <div
                  className="user-dropdown-item"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload Profile Picture
                </div>
                <div className="user-dropdown-item" onClick={logout}>
                  Logout
                </div>
              </>
            ) : (
              <div
                className="user-dropdown-item"
                onClick={() => {
                  setShowAuthModal(true);
                  setOpen(false);
                }}
              >
                Login / Register
              </div>
            )}
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default UserMenu;
