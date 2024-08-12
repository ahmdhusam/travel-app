# Use an official Node.js runtime as a parent image
FROM node:latest

# Set the working directory
WORKDIR /app

# Install pnpm package manager
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml (or yarn.lock) files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

ARG SERVICE_NAME=gateway-service
ENV SERVICE_NAME=$SERVICE_NAME

# Copy the rest of the application code
COPY . .
RUN rm -r apps/
COPY apps/shared/ apps/shared/
COPY apps/$SERVICE_NAME/ apps/$SERVICE_NAME/

# Expose the port the app runs on
EXPOSE 3000

# Command to run the NestJS application
CMD ["pnpm", "start", "$SERVICE_NAME"]