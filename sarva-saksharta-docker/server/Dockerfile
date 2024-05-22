FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
#RUN npm install argon2@0.40.1
#RUN npm install cors@2.8.5
#RUN npm install dotenv@16.4.1
#RUN npm install express@4.18.2
#RUN npm install jsonwebtoken@9.0.2
#RUN npm install mongoose@6.12.6
#RUN npm install multer@1.4.5-lts.1
#RUN npm install openai@4.31.0
#RUN npm install svg-captcha@1.4.0
COPY . .
EXPOSE 5500
CMD ["node","index.js"]