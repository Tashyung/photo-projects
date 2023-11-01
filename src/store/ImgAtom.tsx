import { atom } from 'recoil';

interface ImageData {
  imgurl: string;
  timestamp: {
    seconds: number;
    nanoseconds: number;
  }; 
}

export interface imgArray {
  nickname?: string;
  receiveImg?: ImageData[];
  sendImg?: ImageData[];
  uid?: string;
}

export const imgState = atom<imgArray>({
  key: 'imgState', 
  default: {}, 
});