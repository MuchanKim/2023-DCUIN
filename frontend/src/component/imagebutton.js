import React from 'react';
import "./Imagebutton.css"

export default function Imagebutton(props) {
    const { image, alt, onClick, className, type } = props;
    const defaultType = 'building';

    const handleClick = (buildingPath, params) => {
        if (params) {
            console.log("Clicked path:", buildingPath, params.name);
            onClick(`${buildingPath}/${params.name}`);
        } else {
            console.log("Clicked path:", buildingPath);
            onClick(buildingPath);
        }
    };

    const btnClass = `Imagebutton ${className} ${type === 'building' ? 'buildingbtn' : ''} ${type === 'bottom' ? 'bottombtn' : ''} ${!type ? defaultType : ''}`;

    return (
        <button className={btnClass} onClick={() => handleClick(props.path, props.params)}>
            <img src={image} alt={alt} type={type} />
        </button>
    );
}