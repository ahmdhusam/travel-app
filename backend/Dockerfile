# Use an official Node.js runtime as a parent image
FROM node:18.17.1

# Set the working directory
WORKDIR /app

# Install pnpm package manager
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml (or yarn.lock) files
COPY package*.json ./
COPY pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the NestJS application
CMD ["pnpm", "run", "start:dev"]
