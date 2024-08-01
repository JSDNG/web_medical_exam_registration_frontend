FROM node:18-alpine as builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["node"]

FROM nginx:1.23.3
COPY --from=builder /app/build /usr/share/nginx/html
COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

#docker build -t tdq11111/frontend_reactjs_medical .
#docker push tdq11111/frontend_reactjs_medical 
#docker run -d --name frontend_reactjs_medical --network health-booking-network -p 80:80 tdq11111/frontend_reactjs_medical

