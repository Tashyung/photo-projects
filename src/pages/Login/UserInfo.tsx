import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../provider/authContext';
import { auth, db } from '../../../firebase';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
  Firestore,
} from 'firebase/firestore';

const UserInfo = () => {
  const user = useContext(AuthContext);
  const [userName, setUserName] = useState<string>('');

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('로그아웃 성공!');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
      alert('로그아웃 실패!');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const q = query(collection(db, 'user'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUserName(doc.data().nickname);
        });
      } else {
        console.log('데이터 찾기 오류');
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div style={{ padding: 20, textAlign: 'center' }}>내 정보</div>;
      <button onClick={handleLogout}>로그아웃</button>
      <div>{userName}</div>
    </>
  );
};

export default UserInfo;
