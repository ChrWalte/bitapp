# Docker image for node cli
FROM node:alpine3.10 AS build

# Change directory into source
WORKDIR /source

# Copy the required package information to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy everything else into directory
COPY . .

# Build the project and output to dist directory
RUN npm run build

# Docker image for nginx
FROM nginx:1.19.6-alpine

# Copy the nginx.conf into nginx directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the built files into nginx directory
COPY --from=build /source/dist/portfolio /usr/share/nginx/html

