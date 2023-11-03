import './kakaomap.css';
import KaKaoMaps from './KakaoMap'

interface KakaoMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

  // console.log(latitude)
  // console.log(longitude)

  return (
    <div className="map">
      <KaKaoMaps latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default KakaoMap;