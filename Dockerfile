FROM mhart/alpine-node:8

ADD . /code

WORKDIR /code

EXPOSE 3000

VOLUME /code/data

ENV NODE_ENV=development \
    APP_ENV=prd \
    API_TOKEN=

RUN yarn && yarn build