import React, { useEffect, useState } from 'react';
import data from '../database/businfo.json';
import './Schoolbus.css';
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

function Schoolbus() {
    const [UlGobusData, setUlGobusData] = useState([]);
    const [GoUlbusData, setGoUlbusData] = useState([]);
    const [PoGobusData, setPoGobusData] = useState([]);
    const [GoPobusData, setGoPobusData] = useState([]);
    const [GuGobus1Data, setGuGobus1Data] = useState([]);
    const [GoGubus1Data, setGoGubus1Data] = useState([]);
    const [GuGobus2Data, setGuGobus2Data] = useState([]);
    const [GoGubus2Data, setGoGubus2Data] = useState([]);
    const [GyGobusData, setGyGobusData] = useState([]);
    const [GoGybusData, setGoGybusData] = useState([]);
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const UlGobus = data.filter((item) => item.Busname === "울산등교");
        setUlGobusData(UlGobus);
        const GoUlbus = data.filter((item) => item.Busname === "울산하교");
        setGoUlbusData(GoUlbus);

        const PoGobus = data.filter((item) => item.Busname === "포항등교");
        setPoGobusData(PoGobus);
        const GoPobus = data.filter((item) => item.Busname === "포항하교");
        setGoPobusData(GoPobus);

        const GuGobus1 = data.filter((item) => item.Busname === "구미등교1호차");
        setGuGobus1Data(GuGobus1);
        const GoGubus1 = data.filter((item) => item.Busname === "구미하교1호차");
        setGoGubus1Data(GoGubus1);

        const GuGobus2 = data.filter((item) => item.Busname === "구미등교2호차");
        setGuGobus2Data(GuGobus2);
        const GoGubus2 = data.filter((item) => item.Busname === "구미하교2호차");
        setGoGubus2Data(GoGubus2);

        const GyGobus = data.filter((item) => item.Busname === "경주등교");
        setGyGobusData(GyGobus);
        const GoGybus = data.filter((item) => item.Busname === "경주하교");
        setGoGybusData(GoGybus);


    }, []);


    return (
        <body>
            <div className='main'>
                <div className='Header'>
                    <Header
                        title={"시외 버스"}
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
                        <h2>울산</h2>
                        <h3>등교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {UlGobusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>하교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GoUlbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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
                        <h2>포항</h2>
                        <h3>등교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PoGobusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>하교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GoPobusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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
                        <h2>구미</h2>
                        <h3>1호차 등교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GuGobus1Data.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>1호차 하교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GoGubus1Data.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>2호차 등교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GuGobus2Data.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>2호차 하교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GoGubus2Data.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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
                        <h2>경주</h2>
                        <h3>등교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GyGobusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
                                    <tr key={item.Busnumber}>
                                        <td>{item.Busnumber}</td>
                                        <td>{item.Busroute}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <h3>하교</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th className='firstth'>구분</th>
                                    <th>운행 경로</th>
                                </tr>
                            </thead>
                            <tbody>
                                {GoGybusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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