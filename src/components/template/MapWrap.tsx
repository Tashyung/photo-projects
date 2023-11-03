import './KaKaoMap.css';
import KaKaoMaps from './KaKaoMap'

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