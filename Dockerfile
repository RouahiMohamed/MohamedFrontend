# Step 1: Build the Angular app
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install --legacy-peer-deps
RUN npm run build -- --configuration production

# Step 2: Use Nginx to serve the Angular app
FROM nginx:latest
COPY --from=build /app/dist/azure-pfe-platform/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
