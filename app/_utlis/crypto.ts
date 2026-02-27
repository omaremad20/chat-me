import CryptoJS from "crypto-js";

const SECRET = process.env.NEXT_PUBLIC_CHAT_SECRET!;

export function encryptMessage(message: string) {
  return CryptoJS.AES.encrypt(message, SECRET).toString();
}

export function decryptMessage(cipher: string) {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET);
  return bytes.toString(CryptoJS.enc.Utf8);
}