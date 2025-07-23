export const getFriendlyAuthError = (code: string): string => {
  const errorMap: Record<string, string> = {
    "auth/invalid-email": "Invalid email format.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Incorrect password.",
    "auth/email-already-in-use": "This email is already in use.",
    "auth/weak-password": "Password should be at least 6 characters.",
    "auth/missing-password": "Password is required.",
    "auth/missing-email": "Email is required.",
    "auth/internal-error": "An unexpected error occurred. Try again.",
  };

  return errorMap[code] || "Something went wrong. Please try again.";
};
