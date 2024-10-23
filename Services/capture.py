import boto3
import time
import cv2
import os

# AWS S3 버킷 설정
s3 = boto3.resource('s3')
bucket_name = ''
bucket = s3.Bucket(bucket_name)

def printDate():
    print(f"{time.strftime('%Y-%m-%d %H:%M:%S', time.localtime())} 업로드 완료.")

# 웹캠 설정
cap = cv2.VideoCapture(0)

while True:
    # 이미지 캡처
    ret, frame = cap.read()
    
    # 이미지 파일명 설정
    timestamp = str(time.time())
    filename = 'capture.jpg'
    
    # 이미지 파일 저장
    cv2.imwrite(filename, frame)
    
    # AWS S3에 이미지 업로드
    with open(filename, 'rb') as data:
        bucket.put_object(Key=filename, Body=data)
        # 업로드 결과 출력
        printDate()

    # 2분 대기
    time.sleep(120)

    # 이미지 파일 삭제
    os.remove(filename)

# 웹캠 종료
cap.release()
cv2.destroyAllWindows()

