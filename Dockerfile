#docker build -t finit-s-front .
#docker run -d --name finit-s-front -p 80:80 finit-s-front    // 외부:내부
# 프로젝트의 빌드된 파일만 복사
# 빌드 단계: 애플리케이션을 빌드하기 위한 환경 설정
FROM node:22.9.0-alpine AS build-stage

# 작업 디렉토리 설정: /app 디렉토리를 작업 디렉토리로 설정
WORKDIR /app

# package.json과 yarn.lock 복사: 의존성 설치를 위해 필요한 파일 복사
COPY package.json yarn.lock ./

# 의존성 설치: 프로덕션 환경에 필요한 의존성 설치
# 빌드 단계에서 devDependencies의 의존성을 제외하고 설치
RUN yarn install --production

# 소스 코드 복사: 현재 디렉토리의 모든 파일을 작업 디렉토리로 복사
COPY . .
COPY .env /app/.env


# 애플리케이션 빌드: 소스 코드를 빌드하여 배포 가능한 상태로 만듦
RUN yarn build

# 빌드 완료 후 불필요한 파일 삭제
RUN rm -rf /app/node_modules/.cache \
           /app/.nuxt/dist/client \
           /app/public \
           /app/tests


# 실행 단계: 빌드된 애플리케이션을 실행하기 위한 환경 설정
FROM node:22.9.0-alpine

# 작업 디렉토리 설정: /app 디렉토리를 작업 디렉토리로 설정
WORKDIR /app

# 빌드된 파일만 복사: 빌드 단계에서 생성된 파일을 복사
COPY --from=build-stage /app/.output ./

#포트 노출: 컨테이너 외부에서 접근할 수 있도록 포트 노출
EXPOSE 80

# 환경 변수 설정: Nuxt.js 서버가 80번 포트에서 실행되도록 설정
ENV PORT=80


# 애플리케이션 실행: 서버를 시작하기 위한 명령어 실행
CMD ["node", "server/index.mjs"]