FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci

# copy rest for build (dev will mount over)
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
