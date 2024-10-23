# Create your views here.
import mysql.connector
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from django.http import HttpResponse
import json


def search_query(request):
    if request.method == "GET":
        query = request.GET.get("query", "")  # 검색어를 GET 요청에서 가져옵니다.
        request.POST.get("query")
        search_results = search(query)  # 검색 함수 호출
        return HttpResponse(json.dumps(search_results), content_type="application/json")
    else:
        return HttpResponse("Invalid request method.")


# 검색 함수
def search(request):
    search_term = request.GET.get("query", "")

    # Room 테이블에서 검색할 컬럼명 설정
    room_columns = ["BuildingName", "RoomName", "BuildingNumber", "RoomNumber"]

    # 검색결과
    search_result = {"Room": [], "Bus": [], "Professor": [], "Department": []}

    # MySQL 데이터베이스와 연결
    mydb = mysql.connector.connect(
        host=settings.DATABASES["default"]["HOST"],
        user=settings.DATABASES["default"]["USER"],
        password=settings.DATABASES["default"]["PASSWORD"],
        database=settings.DATABASES["default"]["NAME"],
    )

    table_name = ""
    # 모든 테이블에서 검색 실행
    mycursor = mydb.cursor()
    mycursor.execute("SHOW TABLES")
    tables = mycursor.fetchall()
    found = False
    for table in tables:
        table_name = table[0]
        found = True
        # 해당 테이블의 모든 컬럼명 가져오기
        mycursor.execute("SHOW COLUMNS FROM " + table_name)
        columns = mycursor.fetchall()

    if not found:
        print("No matching tuples found in any table.")

    # 입력된 검색어를 띄어쓰기와 하이픈을 기준으로 분리
    search_words = search_term.replace("-", " ").split()

    # 검색할 조건식 생성
    sql_condition = ""
    if table_name == "Room":
        for word in search_words:
            if sql_condition:
                sql_condition += " AND "
            sql_condition += (
                " CONCAT_WS(' ', "
                + ", ".join(
                    ["COALESCE(`" + column + "`, '')" for column in room_columns]
                )
                + ") LIKE '%"
                + word
                + "%'"
            )
    else:
        for word in search_words:
            if sql_condition:
                sql_condition += " AND "
            sql_condition += (
                " CONCAT_WS(' ', "
                + ", ".join(
                    [
                        "COALESCE(`" + column[0] + "`, '')"
                        for column in columns
                        if table_name != "Room"
                    ]
                )
                + ") LIKE '%"
                + word
                + "%'"
            )

    # 검색 실행
    mycursor.execute(f"SELECT * FROM {table_name} WHERE " + sql_condition)
    results = mycursor.fetchall()

    if results:
        if table_name == "Bus":
            search_result["Bus"].append(results)
        if table_name == "Department":
            search_result["Department"].append(results)
        if table_name == "Professor":
            search_result["Professor"].append(results)
        if table_name == "Room":
            search_result["Room"].append(results)

    # MySQL 연결 종료
    mydb.close()

    return JsonResponse(search_result)
