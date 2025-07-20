FROM node:18-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

ENV BASE_URL=https://fakerestapi.azurewebsites.net

CMD ["npx", "mocha", "tests/**/*.js", "--reporter", "mochawesome", "--reporter-options", "reportDir=mochawesome-report,reportFilename=report"]
