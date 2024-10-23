import React from "react";
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import "./Bus.css";

export default function Bus() {
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }
    const handleClick = (path) => {
        navigate(path);
    }

    return (
        <div className="main">
            <div className='Header'>
                <Header
                    title={"셔틀 버스"}
                    leftChild={
                        <Button
                            text={"<"}
                            onClick={handleOnGoBack}
                        />
                    }
                />
            </div>
            <div className="busbutton">
                <button onClick={() => handleClick("/Schoolbus")}>학교 등교 버스</button>
                <button onClick={() => handleClick("/Homebus")}>학교 하교 버스</button>
                <button onClick={() => handleClick("/Sidebus")}>학교 시외 버스</button>
                <button onClick={() => handleClick("/Cyclebus")}>학교 순환 버스</button>
            </div>
        </div>
    );
}