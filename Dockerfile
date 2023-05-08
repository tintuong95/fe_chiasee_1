
# ==== CONFIGURE =====
# Use a Node 16 base image
FROM node:18-alpine 
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN yarn install
# ==== RUN =======
# Expose the port on which the app will be running (3000 is the default that `serve` uses)
EXPOSE 3002
# Start the app
CMD [ "yarn", "start" ]