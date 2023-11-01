import { atom } from 'recoil';

export interface ImageData {
  imgId: string;
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
  default: {
    nickname: '',
    receiveImg: [],
    sendImg: [],
    uid: ''
  }, 
});