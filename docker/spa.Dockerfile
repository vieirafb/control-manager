FROM node:22-alpine
RUN npm install -g @angular/cli
WORKDIR /spa
CMD ["ng", "serve", "--host", "0.0.0.0"]