FROM node:14
WORKDIR '/app'
COPY package.json .
RUN npm install -g @nestjs/cli
RUN npm install
COPY . .
RUN npm run build

FROM node:14
WORKDIR '/app'
COPY package.json .
RUN npm install --only=production
COPY . .
COPY --from=0 /app/dist ./dist
CMD ["node", "dist/main"]
