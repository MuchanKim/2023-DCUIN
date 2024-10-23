import React, { useEffect, useState } from 'react';
import data from '../database/businfo.json';
import './Schoolbus.css';
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

function Schoolbus() {
    const [DaegubusData, setDaegubusData] = useState([]);
    const [NightbusData, setNightbusData] = useState([]);
    const [StationbusData, setStationbusData] = useState([]);
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const Daegubus = data.filter((item) => item.Busname === "대구하교");
        setDaegubusData(Daegubus); // '하교버스' 데이터를 daeguBusData 상태 변수에 저장

        const Nightbus = data.filter((item) => item.Busname === "야간");
        setNightbusData(Nightbus); // '야간' 데이터를 NightbusData 상태 변수에 저장

        const Stationbus = data.filter((item) => item.Busname === "하교지하철역");
        setStationbusData(Stationbus); // '하교지하철역' 데이터를 StationbusData 상태 변수에 저장
    }, []);


    return (
        <body>
            <div className='main'>
                <div className='Header'>
                    <Header
                        title={"하교 버스"}
                        leftChild={
                            <Button
                                text={"<"}
                                onClick={handleOnGoBack}
                            />
                        }
                    />
                </div>
                <div className='body'>
                    <div className='list'>
                        <h2>학교 - 안심역 - 사월역</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>출발 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {StationbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className='list'>
                        <h2>21:00 학교 - 대구</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {DaegubusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className='list'>
                        <h2>야간 지하철역</h2>
                        <p>학교/A2 - 안심역(1호선) - 사월역(2호선) - 용지역(3호선)</p>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>출발 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {NightbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </body>
    );
}

export default Schoolbus;