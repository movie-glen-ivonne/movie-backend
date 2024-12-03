# Use a Node.js base image
FROM node:16

# Define ARGs
ARG DB_HOST
ARG DB_PORT
ARG DB_DATABASE
ARG DB_USERNAME
ARG DB_PASSWORD
ARG DB_TYPE
ARG PORT
ARG JWT_SECRET
ARG API_MOVIE_KEY
ARG API_MOVIE_URL
ARG OPENAI_API_KEY
ARG OPENAI_ORGANIZATON
ARG OPENAI_PROJECT

# Use ARGs in ENV
ENV DB_HOST=${DB_HOST}
ENV DB_PORT=${DB_PORT}
ENV DB_DATABASE=${DB_DATABASE}
ENV DB_USERNAME=${DB_USERNAME}
ENV DB_PASSWORD=${DB_PASSWORD}
ENV DB_TYPE=${DB_TYPE}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}
ENV API_MOVIE_KEY=${API_MOVIE_KEY}
ENV OPENAI_API_KEY=${OPENAI_API_KEY}
ENV OPENAI_ORGANIZATON=${OPENAI_ORGANIZATON}
ENV OPENAI_PROJECT=${OPENAI_PROJECT}

# Set the working directory
WORKDIR /

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Delete the 'dist' folder before compilation
RUN rm -rf ./dist

# Copy TypeScript source code
COPY . .

# Install TypeScript globally
RUN npm install -g typescript

# Compile TypeScript to JavaScript
RUN tsc

# Expose the port the app will run on
EXPOSE 3001

# Start the application (in this case, the compiled JavaScript file)
CMD ["node", "dist/index.js"]
