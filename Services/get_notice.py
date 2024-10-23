import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin
import schedule
import time

def crawl_school_website():
    # 학교 공지사항 페이지에서 HTML 가져오기
    url = "https://www.cu.ac.kr/plaza/notice/notice"
    response = requests.get(url)
    soup = BeautifulSoup(response.content, "html.parser")

    # 링크 추출
    links = soup.select('td>a[href*="notice"]:not(:has(span))')

    # 상위 3개 출력
    top = 3

    for link in links[:top]:
        # 절대 URL로 변환하여 출력
        absolute_url = urljoin(url, link['href'])
        print("제목:", link.text.strip())
        print("링크:", absolute_url)
        print('')

def schedule_crawler():
    # 6시간마다 크롤러 함수 실행
    schedule.every(6).hours.do(crawl_school_website)

    while True:
        schedule.run_pending()
        time.sleep(1)

# 스케줄링 함수 실행
schedule_crawler()
