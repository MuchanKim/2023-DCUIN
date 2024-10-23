import React, { useEffect, useState } from 'react';
import data from '../database/businfo.json';
import './Schoolbus.css';
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

function Schoolbus() {
    const [HayangbusData, setHayangbuData] = useState([]);
    const [CyclebusData, setCyclebusData] = useState([]);
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const Hayangbus = data.filter((item) => item.Busname === "하양역출발");
        setHayangbuData(Hayangbus); // '등교버스' 데이터를 daeguBusData 상태 변수에 저장

        const Cyclebus = data.filter((item) => item.Busname === "캠퍼스정문출발");
        setCyclebusData(Cyclebus); // '안심역출발' 데이터를 ansimBusData 상태 변수에 저장

    }, []);


    return (
        <body>
            <div className='main'>
                <div className='Header'>
                    <Header
                        title={"교내 순환 버스"}
                        leftChild={
                            <Button
                                text={"<"}
                                onClick={handleOnGoBack}
                            />
                        }
                    />
                </div>
                <div className='body'>
                    <div>
                        <div className='list'>
                            <h2>하양역 출발</h2>
                            <p>하양역 출발 (하양역 맞은편 롯데하이마트 앞 - 캠퍼스 정문 - 취창업관(B1) - 성예로니모관(C7) - 성마태오관(C13) - 성이시도르관(D6) - 교양관(A2) 건너편)</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='firstth'>구분</th>
                                        <th>운행 경로</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {HayangbusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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
                            <h2>캠퍼스 정문 출발</h2>
                            <p>캠퍼스 정문 출발 (캠퍼스 정문 - 취창업관(B1) - 성예로니모관(C7) - 성마태오관(C13) - 성이시도르관(D6) - 교양관(A2) 건너편)</p>
                            <table>
                                <thead>
                                    <tr>
                                        <th className='firstth'>구분</th>
                                        <th>출발 시간</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {CyclebusData.map((item) => ( // 검색 결과를 map 함수를 사용하여 출력합니다.
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
            </div>
        </body>
    );
}

export default Schoolbus;