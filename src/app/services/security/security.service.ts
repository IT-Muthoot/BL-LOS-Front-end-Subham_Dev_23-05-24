import { Injectable } from '@angular/core';
import * as forge from 'node-forge';
import { decryptData, encryptData } from '../aes/aes.services';
import { environment } from '../../global/api-url.config';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private maxChunkSize: number = 500;


    // publicKeyPem = 
    // `-----BEGIN PUBLIC KEY-----MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA0ycwgMchoUesg6anOQ3HPPXL8gdEDMpp8XmCb+GBj8LMxXxlzdJh2/AoZnV5kLJdiGrl8UlOvQrHEo44y0Id3ipJ+HEGdCVFzx2m2wikJL6Ap1gIb75PXxH8RYQYDf5xtECwbFEANQKjlaFMWmUcCXMTFODRC8ilm3qG/HyAqtxGIdsxTdMngIbWM7jdZl75iPRLRF0dDIKmrfGt3DkLj2xzbhChvteW87amSkYT0oJCjQ44l8RgbeNXG34//htrSHBfy6f4MqyoIVAhnC2B3AxmZMgzTYpo1luBuLfSRhs9VQqydrNkTYJzsepQjmaguXiRNpr3d7COWFNPgfTcs2DXl+rH0fB0uZu3TNduGFk6vKku89z9Ag++eLAdu/ldfYZ8PSDnBTZ5+1d39soJxRbGyilsykn01FvK3knyshgYhaidKMubxBj5hv9Vl6HY47HiCZUAgm+cNzUTlS/qVlBkXplJ2Vd5j5VGnK9DIzOilO8kmNmQ+vAm4Y9M4etHztXhyB9snCKwt0RLOh8/qF9zWTTL3HkcscJJ37HSOcJ6hjK9Nqrw3Tp3ZxHNTCRC63UU4MeAN+x4YLYGwOXPzIrbXYbI2sjRlLAe0LyU1dOuLmknkIpGt84iN+IctkElKGOPZo25AVooDQTV1tua2ZRLLFPUhlNZ/cefXvMj620CAwEAAQ==-----END PUBLIC KEY-----`;
    privateKey= decryptData(environment._rsaPrivateKey);
    constructor() {}

  encryptData(data: string): string {
    const publicKey = forge.pki.publicKeyFromPem(this.privateKey);
    const buffer = forge.util.createBuffer(data, 'utf8');
      const bytes = buffer.getBytes();
      const encryptedChunks: string[] = [];
      for (let i = 0; i < bytes.length; i += this.maxChunkSize) {
        const chunk = bytes.substring(i, i + this.maxChunkSize);
        const encrypted = publicKey.encrypt(chunk, 'RSAES-PKCS1-V1_5');
        encryptedChunks.push(forge.util.encode64(encrypted));
      }
      return encryptedChunks.join('');
  }

  // encryptData(data: string): string {
  //   const publicKey = forge.pki.publicKeyFromPem(this.privateKey);
  //   const buffer = forge.util.createBuffer(data, 'utf8');
  //   const bytes = buffer.getBytes();
  //   const encryptedChunks: string[] = [];
  //   console.log(bytes.length)
  //   // Encrypt data in chunks
  //   for (let i = 0; i < bytes.length; i += this.maxChunkSize) {
  //     const chunk = bytes.substring(i, i + this.maxChunkSize);
  //     const encrypted = publicKey.encrypt(chunk, 'RSAES-PKCS1-V1_5');
  //     encryptedChunks.push(forge.util.encode64(encrypted)); // Base64 encode each chunk
  //     console.log('encryptde',encryptedChunks);
      
  //   }
  //   var data = encryptedChunks.join('');
  //   console.log(data);
    
  //   // Join all encrypted chunks into a single string
  //   return encryptedChunks.join(''); // You can add a delimiter if necessary
  // }

}