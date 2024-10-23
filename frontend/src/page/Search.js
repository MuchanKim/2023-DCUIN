import './Search.css';
import React, { useState } from "react";
import Header from "../component/header";
import Button from "../component/button";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Search() {
    const navigate = useNavigate();

    const handleOnGoBack = () => {
        navigate(-1);
    }

    //검색 입력
    const [query, setQuery] = useState('');

    //검색 결과
    const [results, setResults] = useState({ building: [], bus: [], professor: [], department: [] });

    //검색어를 입력할 때마다 검색어 상태값 변경
    const handleInputChange = (event) => {
        setQuery(event.target.value);
        setResults({ building: [], bus: [], professor: [], department: [] });
    }

    //엔터를 입력해도 검색어가 넘어가도록
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    }

    // 검색어를 백 엔드로 전송하여 결과 값을 받아옴
    const handleSearch = async () => {
        console.log("검색어: ", query);
        try {
            axios.defaults.withCredentials = true;
            setQuery(''); // query 값을 초기화
            setResults({ building: [], bus: [], professor: [], department: [] }); // results 객체를 초기화
            const response = await axios.get(`http://127.0.0.1:8000/Search?query=${encodeURIComponent(query)}`);
            const data = response.data;

            setResults(data);
            console.log("검색 결과: ", data); // JSON 데이터 출력

        } catch (error) {
            console.error(error);
            setResults({ building: [], bus: [], professor: [], department: [] }); // 검색 결과가 없는 경우에도 객체 초기화
        }
    }

    //검색 결과 리스트 반환
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
                        value={query}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button onClick={handleSearch}>검색</button>
                </div>

                <div className="result">
                    <hr />
                    <div>
                        <h2>강의실</h2>
                        {results.building && results.building.length > 0 ? (
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
                                    {results.building.map((result) => (
                                        <tr key={result.BuildingNumber}>
                                            <td>{result.BuildingNumber}</td>
                                            <td>{result.BuildingName}</td>
                                            <td>{result.ActualUse}</td>
                                            <td>{result.ManageDepartment}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>강의실 관련 검색 결과가 없습니다.</p>
                        )}
                    </div>
                    <hr />
                    <div>
                        <h2>부서</h2>
                        {results.department && results.department.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>부서명</th>
                                        <th>부서장</th>
                                        <th>사무실 번호</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {results.department.map((result) => (
                                        <tr key={result.DepartmentName}>
                                            <td>{result.DepartmentName}</td>
                                            <td>{result.DepartmentHead}</td>
                                            <td>{result.OfficeNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>부서 관련 검색 결과가 없습니다.</p>
                        )}
                        <hr />
                        <hr />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;