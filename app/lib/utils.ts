import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function fileToBase64(file: Blob) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          const base64String = reader.result?.split(',')[1];
          console.log("Base64 String: ", base64String); 
          resolve(base64String);
      };

      reader.onerror = (error) => {
          console.log("Error reading file:", error);
          reject(error);
      };
  });
}


export const fromStringImagesToPng = (evidence: string) => {
  return `data:image/png;base64,${evidence}`;
};