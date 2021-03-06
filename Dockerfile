FROM node:latest

ENV DIR=/opt/insight PORT=3000 NODE_ENV=production

RUN mkdir -p /opt/insight

COPY package.json ${DIR}/
WORKDIR $DIR

COPY /build $DIR

EXPOSE $PORT
CMD [ "node", "server" ]