export function sayHello() {
  console.log("hello");
}

const base64ToBlob = (base64: string, mimeType: string): Blob => {
  // Decode the base64 string
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
};

export const displayImageFromBase64 = (
  base64: string,
  mimeType: string
): string => {
  const blob = base64ToBlob(base64, mimeType);
  const url = URL.createObjectURL(blob);
  console.log(url);
  // Cleanup: Revoke the Object URL after the download
  setTimeout(() => URL.revokeObjectURL(url), 100);
  return url;
};
