# Base image with Bun
FROM oven/bun:1 AS base
WORKDIR /app

# Copy only the package manager files initially to leverage caching
COPY bun.lockb package.json ./

# Install all dependencies (including dev) - only runs when dependencies change
RUN bun install --frozen-lockfile

# ---------------------------------------
# Only copy necessary files for the build
# ---------------------------------------
COPY . .

# Build the Nuxt app
RUN bun run build

# ---------------------------------------
# Final minimal production image
# ---------------------------------------
FROM oven/bun:1 AS release
WORKDIR /app

# Only copy the output from the build stage, avoid unnecessary files
COPY --from=base /app/.output .output
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./  

# Expose the Nuxt app port
EXPOSE 3000

# Set the environment variable (default to 'development' if not passed)
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Use Bun to run the Nuxt server
CMD ["bun", "x", "nuxt", "start"]
