import './KaKaoMap.css';
import KakaoMaps from './KaKaoMap'

interface KakaoMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

  // console.log(latitude)
  // console.log(longitude)

  return (
    <div className="map">
      <KakaoMaps latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default KakaoMap;