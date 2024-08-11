FROM node:20-alpine

WORKDIR /app

ENV ENV=production

COPY . .

# 의존성 설치
RUN yarn workspaces focus @zicdding-web/ui @zicdding-web/zicdding-class-com

WORKDIR /app/zicdding-class.com

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
