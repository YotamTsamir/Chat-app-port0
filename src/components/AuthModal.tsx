import { useState } from "react";
import { handleUpload } from "../utils";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/config";

const AuthModal = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isRegister) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const user = userCredential.user;

        let photoURL;
        if (photo) {
          photoURL = await handleUpload(photo, user);
        }

        await updateProfile(user, {
          displayName,
          photoURL,
        });

        await user.reload();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }

      onClose();
    } catch (err: any) {
      const msg = err?.message || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>
        <form onSubmit={handleSubmit} className="auth-form">
          <h3>{isRegister ? "Register" : "Login"}</h3>
          {error && <div className="auth-error-text">{error}</div>}

          {isRegister && (
            <>
              <div className="auth-upload-wrapper">
                <label
                  htmlFor="avatar-upload"
                  className={`auth-upload-label ${photo ? "has-photo" : ""}`}
                >
                  {photo ? (
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="Profile preview"
                      className="auth-upload-preview"
                    />
                  ) : (
                    "Upload Profile Picture"
                  )}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    e.target.files?.[0]
                      ? setPhoto(e.target.files?.[0] || null)
                      : ""
                  }
                />
              </div>
              <input
                className="auth-input"
                placeholder="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </>
          )}

          <input
            className="auth-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="auth-button" type="submit">
            {isRegister ? "Register" : "Login"}
          </button>

          <button
            className="auth-toggle"
            type="button"
            onClick={() => {
              setIsRegister((prev) => !prev);
              setError("");
            }}
          >
            {isRegister ? "Already have an account?" : "Create new account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
