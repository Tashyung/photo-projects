import { useContext } from 'react';
import { AuthContext } from '../../provider/authContext';
import { auth } from '../../../firebase';

const UserInfo = () => {
  const user = useContext(AuthContext);
  console.log('유저는', user);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('로그아웃 성공!');
    } catch (error) {
      console.error('로그아웃 실패: ', error);
      alert('로그아웃 실패!');
    }
  };

  return (
    <>
      <div style={{ padding: 20, textAlign: 'center' }}>내 정보</div>;
      <button onClick={handleLogout}>로그아웃</button>
    </>
  );
};

export default UserInfo;
