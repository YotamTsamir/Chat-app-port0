// src/pages/LoginPage.tsx
import { useEffect, useState } from "react";
import { login, register } from "../firebase/auth";
import { getFriendlyAuthError } from "../utils";

const LoginPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setError(null);
  }, [isRegister]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!displayName.length && isRegister) {
      setError("Must choose display name.");
      return;
    }
    try {
      if (isRegister) {
        await register(email, password, displayName);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(getFriendlyAuthError(err.message));
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isRegister ? "Register" : "Login"}</h2>
        <div className="auth-error-wrapper">
          {error ? (
            <span className="auth-error-text">{error}</span>
          ) : (
            <span>&nbsp;</span>
          )}
        </div>
        {isRegister && (
          <input
            className="auth-input"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        )}
        <input
          className="auth-input"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="auth-input"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-button">
          {isRegister ? "Register" : "Login"}
        </button>
        <button
          type="button"
          className="auth-toggle"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? "Already have an account?" : "Create an account"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
