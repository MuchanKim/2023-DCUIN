import mysql.connector

# MySQL 데이터베이스와 연결
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="tmdqja00!!",
    database="Campus"
)


# 검색 함수
def search(table_name, search_term):
    mycursor = mydb.cursor()

    # 해당 테이블의 모든 컬럼명 가져오기
    mycursor.execute("SHOW COLUMNS FROM " + table_name)
    columns = mycursor.fetchall()

    # 입력된 검색어를 띄어쓰기를 기준으로 분리
    search_words = search_term.split()

    # 검색할 조건식 생성
    sql_condition = ""
    for word in search_words:
        if sql_condition:
            sql_condition += " AND "
        sql_condition += " CONCAT_WS(' ', " + ", ".join(
            ["COALESCE(`" + column[0] + "`, '')" for column in columns]) + ") LIKE '%" + word + "%'"

    # 검색 실행
    mycursor.execute(f"SELECT * FROM {table_name} WHERE " + sql_condition)
    results = mycursor.fetchall()
    if results:
        for result in results:
            print(result)
    else:
        print(f"No matching tuples found in {table_name}.")


# 프로그램 실행
while True:
    # 검색어 입력 받음
    search_term = input("Enter the search term: ")

    # 모든 테이블에서 검색 실행
    mycursor = mydb.cursor()
    mycursor.execute("SHOW TABLES")
    tables = mycursor.fetchall()
    found = False
    for table in tables:
        table_name = table[0]
        search(table_name, search_term)
        found = True

    if not found:
        print("No matching tuples found in any table.")

    # 종료 여부 확인
    print("Press Q to quit, or any other key to search again.")
    choice = input().lower()
    if choice == "q":
        break

# MySQL 연결 종료
mydb.close()
