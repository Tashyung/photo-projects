import { GeoPoint, Timestamp } from 'firebase/firestore';
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

export interface detailI {
  isExchanged: boolean,
  receiver: string,
  sender: string,
  location: GeoPoint,
  imageURL: string,
  timestamp: Timestamp
}