# Use an official Node.js image as the base
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app to the container
COPY . .

# Build the React app
RUN npm run build

# Install `serve` to serve the build directory
RUN npm install -g serve

# Command to run the app using serve
CMD ["serve", "-s", "build"]

# Expose the port on which the app will run
EXPOSE 3000
