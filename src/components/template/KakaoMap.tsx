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

const Map: React.FC<KakaoMapProps> = ({ latitude, longitude }) => {

  // console.log(latitude)
  // console.log(longitude)

  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.async = true;
  //   script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=7dd295efd9cb177e3cd92f4a7e535589&autoload=false";
  //   script.onload = () => {
  //     console.log('스크립트 로드됨');
  //     mapscript();
  //   };
  //   document.head.appendChild(script);
    
  //   // 클린업 함수
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, [latitude, longitude]);


    useEffect(() => {
          let container = document.getElementById("map");
          console.log('a')
          if (!container) return;
          if (latitude !== undefined && longitude !== undefined) {
            let center = new window.kakao.maps.LatLng(latitude, longitude);
            let options = {
              center: center,
              level: 5,
              disableClick: true, 
            };
            const map = new window.kakao.maps.Map(container, options);

            //마커가 표시 될 위치
            // let markerPosition = new window.kakao.maps.LatLng(
            //   37.62197524055062,
            //   127.16017523675508
            // );
            
  
            // 마커를 생성
            let marker = new window.kakao.maps.Marker({
              position: options.center,
              // position: markerPosition
            });
            
            function setZoomable(zoomable: boolean) {
              // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
              map.setZoomable(zoomable);    
            }

            function setDraggable(draggable: boolean) {
              // 마우스 드래그로 지도 이동 가능여부를 설정합니다
              map.setDraggable(draggable);    
          }


            setZoomable(false);  
            setDraggable(false);
  
            // 마커를 지도 위에 표시
            marker.setMap(map);
          }
      }, [latitude, longitude]);


      return <div id="map" style={{ width: "100%", height: "100%" }}></div>;


}

export default Map;
