import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Center } from '@chakra-ui/react';
import PhotoSave from './PhotoSave';
import { AuthContext } from '../../provider/authContext';

const PhotoEdit = () => {
  const location = useLocation();
  const imageURL = new URLSearchParams(location.search).get('imageURL');
  const navigate = useNavigate();

  const user = useContext(AuthContext);
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <>
      {imageURL && user.uid && (
        <>
          <Center>
            <img
              src={imageURL}
              style={{ maxWidth: '100%', maxHeight: '400px' }}
            />
          </Center>
          <Center>
            <PhotoSave imageURL={imageURL} userUID={user.uid} />
          </Center>
        </>
      )}
    </>
  );
};

export default PhotoEdit;
