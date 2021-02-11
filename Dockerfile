FROM ubuntu:20.04
MAINTAINER Evan W. Patton ewpatton@mit.edu
ENV TZ=America/New_York
EXPOSE 3000
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN mkdir -p /app/public/uploads
WORKDIR /app
VOLUME /app/public/uploads
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get -y upgrade && apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs
ADD . /app/
RUN npm install
RUN npx webpack
ENTRYPOINT ["npm", "start"]
