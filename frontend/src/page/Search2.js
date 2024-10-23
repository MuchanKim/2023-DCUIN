import React, { useState } from 'react';
import roomData from '../database/roominfo.json';
import professorData from '../database/professorinfo.json';
import busData from '../database/businfo.json';
import departmentData from '../database/departmentinfo.json';
import './Search.css';
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";

function Search() {
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState({
        room: [],
        professor: [],
        department: [],
        bus: [],
    });

    const handleSearch = () => {
        const query = searchQuery || '';
        const splitQuery = query.split(/[ -]+/).filter(Boolean);

        const allData = [
            ...roomData.map((item) => ({ ...item, table: 'room' })),
            ...departmentData.map((item) => ({ ...item, table: 'department' })),
            ...professorData.map((item) => ({ ...item, table: 'professor' })),
            ...busData.map((item) => ({ ...item, table: 'bus' })),
        ];

        const results = {
            room: allData.filter((item) => item.table === 'room' && splitQuery.every((word) =>
                [item.BuildingNumber, item.BuildingName, item.RoomNumber, item.RoomName].some((field) =>
                    field?.includes(word)
                )
            )),
            professor: allData.filter((item) => item.table === 'professor' && splitQuery.every((word) =>
                [item.Name, item.Email, item.PhoneNum, item.ProfOfficeBuildingNum, item.ProfOfficeRoomNum].some((field) =>
                    field?.includes(word)
                )
            )),
            department: allData.filter((item) => item.table === 'department' && splitQuery.every((word) =>
                [toString(item.DepartmentNumber), item.DepName, item.College, item.DepOfficeBuildingNum, item.DepOfficeRoomNum, item.OfficePhoneNum, toString(item.HeadProfessorSsn)].some((field) =>
                    field?.includes(word)
                )
            )),
            bus: allData.filter((item) => item.table === 'bus' && splitQuery.every((word) =>
                [item.Category, item.Busname, item.Busnumber, item.Busroute].some((field) =>
                    field?.includes(word)
                )
            )),
        };

        setSearchResults(results);
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchResults({
            room: [],
            professor: [],
            department: [],
            bus: [],
        });

        if (e.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className='main'>
            <div className='Header'>
                <Header
                    title={"검색"}
                    leftChild={
                        <Button
                            text={"<"}
                            onClick={handleOnGoBack}
                        />
                    }
                />
            </div>
            <div className="body">
                <div className="searcharea">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요."
                        value={searchQuery}
                        onChange={handleInputChange}
                        onKeyDown={handleInputChange}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>
                <div className="result">
                    <hr />
                    <div>
                        <h2>강의실</h2>
                        {searchResults.room.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>건물 번호</th>
                                        <th>건물명</th>
                                        <th>사용 용도</th>
                                        <th>관리 부서</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.room.map((result) => (
                                        <tr key={result.BuildingNumber}>
                                            <td>{result.BuildingNumber}-{result.RoomNumber}</td>
                                            <td>{result.BuildingName}</td>
                                            <td>{result.RoomName}</td>
                                            <td>{result.ManageDepartment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>강의실 관련 검색 결과가 없습니다.</p>
                        )}

                        <p />
                    </div>
                    <hr />
                    <div>
                        <h2>학과</h2>
                        {searchResults.department.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>학과</th>
                                        <th>사무실</th>
                                        <th>연락처</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.department.map((result) => (
                                        <tr key={result.DepartmentNumber}>
                                            <td>{result.DepName}</td>
                                            <td>{result.DepOfficeBuildingNum}-{result.DepOfficeRoomNum}</td>
                                            <td>{result.OfficePhoneNum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>학과 관련 검색 결과가 없습니다.</p>
                        )}

                        <p />
                    </div>
                    <hr />
                    <div>
                        <h2>교수</h2>
                        {searchResults.professor.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>이름</th>
                                        <th>이메일</th>
                                        <th>연구실</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.professor.map((result) => (
                                        <tr key={result.Name}>
                                            <td>{result.Name}</td>
                                            <td>{result.Email}</td>
                                            <td>{result.ProfOfficeBuildingNum}-{result.ProfOfficeRoomNum}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>교수 관련 검색 결과가 없습니다.</p>
                        )}
                        <p />
                    </div>
                    <hr />
                    <div>
                        <h2>셔틀 버스</h2>
                        {searchResults.bus.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>분류</th>
                                        <th>버스 이름</th>
                                        <th>버스 번호</th>
                                        <th>버스 노선</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchResults.bus.map((result) => (
                                        <tr key={result.Busnumber && result.Busname}>
                                            <td>{result.Category}</td>
                                            <td>{result.Busname}</td>
                                            <td>{result.Busnumber}</td>
                                            <td>{result.Busroute}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>셔틀 버스 관련 검색 결과가 없습니다.</p>
                        )}
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    );


}

export default Search;
