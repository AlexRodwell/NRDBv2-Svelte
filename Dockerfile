FROM node:20-alpine

# Set working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy only the necessary files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Pass build arguments as environment variables
ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=${PUBLIC_API_URL}

# Copy the rest of the application code
COPY . .

# Build the SvelteKit app for production
RUN pnpm build

# Expose the port the app will run on
EXPOSE 3434

# Start the app in production mode
CMD ["node", "./build/index.js", "--host", "0.0.0.0", "--port", "${PORT}"]