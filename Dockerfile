FROM markadams/chromium-xvfb

ENV DIR=/opt/insight PORT=3000 NODE_ENV=production

RUN apt-get update && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -
RUN apt-get install -y nodejs

WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
RUN npm i -g webpack cross-env

COPY . /usr/src/app/

EXPOSE $PORT
CMD [ "npm", "run", "start:production" ]