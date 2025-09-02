# Use Node.js v22
FROM node:22

# Enable and install pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package.json pnpm-lock.yaml ./

# Install dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose the service port
EXPOSE 3012

# Run prisma migrate and then start app in one shell command
CMD sh -c "npx prisma migrate deploy && pnpm start"
