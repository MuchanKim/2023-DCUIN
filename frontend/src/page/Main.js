import React, { useState, useEffect } from "react";
import "./Mainmap.css";
import mapImage from "../image/map.jpg";
import building from "../image/buildingbtn.png"
import busstop from "../image/busstopbtn.png"
import searchbtn from "../image/searchbtn.png"
import busbtn from "../image/busbtn.png"
import bitcrowdbtn from "../image/bitcrowdbtn.png"
import crowdbtn from "../image/crowdbtn.png"
import smoothbtn from "../image/smoothbtn.png"
import Imagebutton from "../component/imagebutton";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useNavigate } from 'react-router-dom'

export default function App() {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [congestion, setCongestion] = useState(null);

    useEffect(() => {
        // REST API 호출, 식당 버튼 호출을 위한
        const interval = setInterval(() => {
            fetch('/api/congestion/')
                .then(response => response.json())
                .then(data => setCongestion(data.congestion))
                .catch(error => console.error(error));
        }, 60000); // 1분마다 API 호출

        return () => clearInterval(interval);
    }, []);

    // congestion 값에 따라서 다른 이미지 버튼을 보여줌
    let RestImage;
    if (congestion === null) {
        // congestion 값이 아직 초기화되지 않은 경우 로딩 화면을 보여줌
        RestImage = <img className="D16" src={smoothbtn} alt="art_restaurant" />;
        <Imagebutton className="D16" type={"building"} image={smoothbtn} alt="building button" />;
    } else if (congestion > 0.8) {
        <Imagebutton className="D16" type={"building"} image={crowdbtn} alt="building button" />;
    } else if (congestion > 0.5) {
        <Imagebutton className="D16" type={"building"} image={bitcrowdbtn} alt="building button" />;
    } else {
        <Imagebutton className="D16" type={"building"} image={smoothbtn} alt="building button" />;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const navigate = useNavigate();

    const handleClick = (path, buildingname, floornumber) => {
        navigate(path, { state: { buildingname, floornumber } });
    }

    return (
        <div className="main">
            <div className="container" style={{ overflow: 'hidden', touchAction: 'none' }}>
                <div className="head">
                    <div className="time">{currentTime}</div>
                    <div className="notice"></div>
                </div>
                <div className="bottom">
                    <Imagebutton className="busbtn" type={"bottom"} image={busbtn} alt="building button" onClick={() => handleClick("/Bus")} />
                    <Imagebutton className="searchbtn" type={"bottom"} image={searchbtn} alt="building button" onClick={() => handleClick("/Search")} />
                </div>
                <TransformWrapper
                    options={{
                        disabled: false,
                        limitToBounds: false
                    }}
                >
                    {({ zoomIn, zoomOut, resetTransform }) => (
                        <React.Fragment>
                            <TransformComponent
                                style={{
                                    PointerEvent: 'none'
                                }}>
                                <div id="map">
                                    <img src={mapImage} alt="map_image" />
                                    <Imagebutton className="D2" type={"building"} image={building} alt="building button" onClick={() => handleClick("/D2/1", "D2", 1)} />
                                    <Imagebutton className="A8" type={"building"} image={building} alt="building button" onClick={() => handleClick("/A8/1", "A8", 1)} />
                                    <Imagebutton className="A2" type={"building"} image={building} alt="building button" onClick={() => handleClick("/A2/1", "A2", 1)} />
                                    <Imagebutton className="A6" type={"building"} image={building} alt="building button" onClick={() => handleClick("/A6/1", "A6", 1)} />
                                    <Imagebutton className="busstop1" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop2" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop3" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop4" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop5" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    <Imagebutton className="busstop6" type={"building"} image={busstop} alt="building button" onClick={() => handleClick("/Bus")} />
                                    {RestImage}
                                </div>
                            </TransformComponent>
                        </React.Fragment>
                    )}
                </TransformWrapper>
            </div>
        </div>
    );
}