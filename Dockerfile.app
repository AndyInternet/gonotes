# Use Node 24 as base image
FROM node:24

# Set working directory
WORKDIR /usr/src/app

# Copy package files
COPY app/package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm install

# Copy app source
COPY app/ .

# Expose port 3000
EXPOSE 3000

# Start the development server
CMD ["npm", "run", "dev"]