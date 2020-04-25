FROM node:latest

ADD ./ ./

WORKDIR ./

RUN yarn install
RUN yarn run build
RUN yarn global add serve

ENV PORT 8000
EXPOSE 8000

CMD serve -s build -l 8000
