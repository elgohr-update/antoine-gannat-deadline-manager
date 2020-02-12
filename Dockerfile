FROM node:12-alpine

# Set the working directory
WORKDIR /app/deadline-manager

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

ENV PUBLIC_URL /

# Build react
RUN npm run build

# Expose the port
EXPOSE 5000

# Serve the build folder on port 5000
CMD ["node", "node_modules/serve/bin/serve.js", "-s", "build"]