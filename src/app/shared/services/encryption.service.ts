import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  secretKey = environment.secretKey;
  key = {
    keySize: 256 / 8,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  };

  constructor() {}

  encrypt(sentence: string): string {
    if (sentence == undefined) {
      return '{}';
    }
    return CryptoJS.AES.encrypt(
      CryptoJS.enc.Utf8.parse(sentence),
      this.secretKey
    ).toString();
  }

  decrypt(sentence: string): string {
    if (sentence == undefined) {
      return '{}';
    }
    return CryptoJS.AES.decrypt(sentence, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }

  encryptKey(sentence: string): string {
    if (sentence == undefined) {
      return '{}';
    }
    return CryptoJS.HmacSHA256(
      CryptoJS.enc.Utf8.parse(sentence),
      this.secretKey
    ).toString();
  }

  decryptKey(sentence: string): string {
    if (sentence == undefined) {
      return '{}';
    }
    return CryptoJS.HmacSHA256(sentence, this.secretKey).toString(
      CryptoJS.enc.Utf8
    );
  }
}
