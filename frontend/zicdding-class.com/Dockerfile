# Build stage
FROM node:20-alpine AS build

WORKDIR /app

ENV ENV=production

# Enable Corepack and install the correct version of Yarn
RUN corepack enable && corepack prepare yarn@stable --activate

# Copy package.json and yarn.lock from the frontend directory to the Docker build context
COPY ../package.json ../yarn.lock ./

# Install dependencies with immutable option
RUN yarn install

# Copy the rest of the code from the frontend directory to the Docker build context
COPY ../ .

# Focus workspaces and build the project
RUN yarn workspaces focus --all
WORKDIR /app/frontend/zicdding-class.com
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

ENV ENV=production

# Copy built files from the build stage
COPY --from=build /app/frontend/zicdding-class.com/build ./build
COPY --from=build /app/frontend/zicdding-class.com/package.json ./package.json
COPY --from=build /app/frontend/zicdding-class.com/node_modules ./node_modules

EXPOSE 3000

CMD ["yarn", "start"]