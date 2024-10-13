#테스트서버 젠킨스 명령어
#docker build -t finit-s-front .
#docker stop finit-s-front; docker rm finit-s-front; docker run -d --name finit-s-front -p 5173:80 finit-s-front 
#docker build -t finit-s-front .
#docker run -d --name finit-s-front -p 80:5173 finit-s-front    // 외부:내부
FROM node:22.9.0-alpine as build-stage

# 작업 디렉토리 설정
WORKDIR /app

# package.json과 yarn.lock 복사
COPY package.json yarn.lock ./

# 의존성 설치
RUN yarn install

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 5173번 포트 노출
EXPOSE 5173

# 애플리케이션 실행
CMD ["yarn", "start"]