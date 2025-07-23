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

export const resizeImageToBlob = (
  file: File,
  maxSize = 128,
  mimeType = "image/jpeg",
  quality = 0.8
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    img.onload = () => {
      const scale = Math.min(maxSize / img.width, maxSize / img.height);
      const width = img.width * scale;
      const height = img.height * scale;

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Failed to create blob"));
        },
        mimeType,
        quality
      );
    };

    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
};
