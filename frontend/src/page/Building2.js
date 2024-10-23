import axios from 'axios';
import "./Building.css";
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Header from "../component/header";
import Button from "../component/button";

export default function Building() {
    const { buildingname, floornumber } = useParams();
    const [building, setBuilding] = useState(null);
    const [floorElements, setFloorElements] = useState([]);

    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate("/");
    };

    const handleFloorClick = (floorNumber) => {
        navigate(`/${buildingname}/${floorNumber}`);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/Building/${buildingname}/${floornumber}/`
                );
                const buildingData = response.data;
                setBuilding(buildingData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [buildingname, floornumber]);

    useEffect(() => {
        if (building) {
            const elements = [];
            for (let i = 1; i <= building.floor; i++) {
                elements.push(<div key={i}>{i}층</div>);
            }
            setFloorElements(elements);
        }
    }, [building]);

    return (
        <div className="main">
            <div className="Header">
                <Header
                    title={buildingname}
                    leftChild={
                        <Button text={"<"} onClick={handleOnGoBack} />
                    }
                />
            </div>
            <div className="BuildingContainer">
                <div className="navbar">
                    {floorElements.map((floor, index) => (
                        <div key={index} onClick={() => handleFloorClick(index + 1)}>
                            {floor}
                        </div>
                    ))}
                </div>
                <div
                    className="Floormap"
                    style={{ overflow: "hidden", touchAction: "none" }}
                >
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
                                        PointerEvent: "none"
                                    }}
                                >
                                    {building ? (
                                        <div id="map">
                                            <img
                                                src={building.floor_image}
                                                alt={`floor ${building.floor_number}`}
                                            />
                                        </div>
                                    ) : (
                                        <p>Loading...</p>
                                    )}
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
            </div>
        </div>
    );
}