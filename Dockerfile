# Use Node.js base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files to the container
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Define the environment variable for the port
ENV PORT=5000

# Start the application
CMD ["npm", "start"]
