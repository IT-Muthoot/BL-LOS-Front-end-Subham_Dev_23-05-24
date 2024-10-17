import * as CryptoJS from 'crypto-js';

const  _sckenc= 'asdfghjkqwertyu';

export function encryptData(data: string): string {
  return CryptoJS.AES.encrypt(data, _sckenc).toString();
}

export function decryptData(encryptedData: string): string {
  const bytes = CryptoJS.AES.decrypt(encryptedData, _sckenc);
  return bytes.toString(CryptoJS.enc.Utf8);
}