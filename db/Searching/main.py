import mysql.connector

# MySQL 데이터베이스와 연결
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Qwer1234!",
    database="Campus"
)

# Room 테이블에서 검색할 컬럼명 설정
room_columns = ["BuildingName", "RoomName", "BuildingNumber", "RoomNumber"]

# 검색 함수
def search(search_term):
    SearchResult = [], [], [], []
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

    """# 해당 테이블의 모든 컬럼명 가져오기
    mycursor.execute("SHOW COLUMNS FROM " + table_name)
    columns = mycursor.fetchall()"""

    #입력된 검색어를 띄어쓰기와 하이픈을 기준으로 분리
    search_words = search_term.replace('-', ' ').split()

    # 검색할 조건식 생성
    sql_condition = ""
    if table_name == "Room":
        for word in search_words:
            if sql_condition:
                sql_condition += " AND "
            sql_condition += " CONCAT_WS(' ', " + ", ".join(
                ["COALESCE(`" + column + "`, '')" for column in room_columns]) + ") LIKE '%" + word + "%'"
    else:
        for word in search_words:
            if sql_condition:
                sql_condition += " AND "
            sql_condition += " CONCAT_WS(' ', " + ", ".join(
                ["COALESCE(`" + column[0] + "`, '')" for column in columns if table_name != "Room"]) + ") LIKE '%" + word + "%'"

    # 검색 실행
    mycursor.execute(f"SELECT * FROM {table_name} WHERE " + sql_condition)
    results = mycursor.fetchall()
    """
    if results:
        if table_name == "Room":
            new_results = []
            i = 0
            for result in results:
                new_result = (result[0], result[2] + "-" + result[3], result[1] + "(" + result[5] + ")", result[4])
                new_results.append(new_result)
                SearchResult[i] = [result[0],result[1],result[2],result[3],result[4]]
                i = i + 1
            for new_result in new_results:
                #print(new_result)
                print(SearchResult)


        else:
            i = 0
            for result in results:
                for j in range(0, len(result)):
                    SearchResult[i].append(result)
                print(result)
                print(SearchResult)
    """
    if results:
        if table_name == "Bus" :
            SearchResult[0].append(results)
        if table_name == "Department":
            SearchResult[1].append(results)
        if table_name == "Professor":
            SearchResult[2].append(results)
        if table_name == "Room":
            SearchResult[3].append(results)

    """else:
        if table_name == "Bus":
            print("입력한 버스 관련 정보를 찾지 못하였습니다.")
        elif table_name == "Department":
            print("입력한 학과 관련 정보를 찾지 못하였습니다.")
        elif table_name == "Professor":
            print("입력한 교수 관련 정보를 찾지 못하였습니다.")
        elif table_name == "Room":
            print("입력한 건물(강의실) 관련 정보를 찾지 못하였습니다.")"""

    return SearchResult


# 프로그램 실행
while True:
    # 검색어 입력 받음
    search_term = input("검색어를 입력해주세요 : ")

    """# 모든 테이블에서 검색 실행
    mycursor = mydb.cursor()
    mycursor.execute("SHOW TABLES")
    tables = mycursor.fetchall()
    found = False
    for table in tables:
        table_name = table[0]
        search(table_name, search_term)
        found = True

    if not found:
        print("No matching tuples found in any table.")"""

    testing = search(search_term)

    for  i in range(0,len(testing)):
        for j in range(0,len(testing[i])):
            for k in range(0, len(testing[i][j])):
                print(testing[i][j][k])

    #print(testing)

    # 종료 여부 확인
    print("Press Q to quit, or any other key to search again.")
    choice = input().lower()
    if choice == "q":
        break

# MySQL 연결 종료
mydb.close()