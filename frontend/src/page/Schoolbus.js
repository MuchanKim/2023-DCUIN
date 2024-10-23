import React, { useEffect, useState } from 'react';
import data from '../database/businfo.json';
import './Schoolbus.css';
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

function Schoolbus() {
    const [DaegubusData, setDaegubusData] = useState([]);
    const [AnsimbusData, setAnsimbusData] = useState([]);
    const [SawolbusData, setSawolbusData] = useState([]);
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const Daegubus = data.filter((item) => item.Busname === "대구등교");
        setDaegubusData(Daegubus); // '등교버스' 데이터를 daeguBusData 상태 변수에 저장

        const Ansimbus = data.filter((item) => item.Busname === "안심역출발");
        setAnsimbusData(Ansimbus); // '안심역출발' 데이터를 ansimBusData 상태 변수에 저장

        const Sawolbus = data.filter((item) => item.Busname === "사월역출발");
        setSawolbusData(Sawolbus); // '안심역출발' 데이터를 ansimBusData 상태 변수에 저장
    }, []);



    return (
        <body>
            <div className='main'>
                <div className='Header'>
                    <Header
                        title={"등교 버스"}
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
                        <h2>대구 출발</h2>
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
                        <h2>안심역 3번 출구 출발</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>운행 경로</th>
                                    <th>출발 시간</th>
                                </tr>
                            </thead>
                            <tbody>

                                {AnsimbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>안심역 - 학교</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <div className='list'>
                        <h2>사월역 3번 출구 출발</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>운행 경로</th>
                                    <th>출발 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SawolbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>사월역 - 학교</td>
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