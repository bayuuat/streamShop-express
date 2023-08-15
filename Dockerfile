# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /stream-shop-server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code to the container
COPY . .

# Expose the port your Express.js app will listen on
EXPOSE 9000

# Command to start your Express.js app
CMD ["npm", "start"]
