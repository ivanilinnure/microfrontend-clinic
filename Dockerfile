FROM node:alpine
WORKDIR /clinic-react-ui
COPY package-lock.json ./
COPY package.json ./
COPY ./ ./
RUN npm run build
CMD ["npm", "start"]