import React, { useEffect } from "react";

declare global {
  interface Window {
    kakao: any;
  }
}

interface KakaoMapProps {
  latitude: number | undefined;
  longitude: number | undefined;
}

// const Map: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

const Map: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7dd295efd9cb177e3cd92f4a7e535589&autoload=false";
    script.onload = () => {
      console.log('스크립트 로드됨');
      mapscript();
    };
    document.head.appendChild(script);

    // 클린업 함수
    return () => {
      document.head.removeChild(script);
    };
  }, [latitude, longitude]);

  const mapscript = () => {
    if (window.kakao && window.kakao.maps) {
      window.kakao.maps.load(() => {
          let container = document.getElementById("map");
          let options = {
            center: new window.kakao.maps.LatLng(latitude, longitude),
            level: 8,
            draggable: false, 
            scrollwheel: false, 
          };
          //map
          const map = new window.kakao.maps.Map(container, options);

          // 마커를 생성
          let marker = new window.kakao.maps.Marker({
            position: options.center,
            // position: markerPosition
          });


          // 마커를 지도 위에 표시
          marker.setMap(map);
      });
    }
  };

  return <div id="map" style={{ width: "100%", height: "100%" }}></div>;
}

export default Map;
