# Base image with Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Copy package manager files early to install dependencies
COPY bun.lockb package.json ./

# Install all dependencies (including dev)
RUN bun install --frozen-lockfile

# Copy the entire project (except ignored files)
COPY . .

# Build the Nuxt app
RUN bun run build

# ---------------------------------------
# Final minimal production image
# ---------------------------------------
FROM oven/bun:1 AS release
WORKDIR /app

# Only copy necessary files from build stage
COPY --from=base /app/.output .output
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./

# Expose default Nuxt port
EXPOSE 3000

# Set production env
ENV NODE_ENV=production

# Use Bun to run the Nuxt server
CMD ["bun", "x", "nuxt", "start"]
