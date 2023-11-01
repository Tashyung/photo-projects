import './kakaomap.css'
import Map from './Map'

interface KakaoMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

const KakaoMap: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

  console.log(latitude)
  console.log(longitude)

  return (
    <div className="map">
      <Map latitude={latitude} longitude={longitude} />
    </div>
  );
}

export default KakaoMap;
