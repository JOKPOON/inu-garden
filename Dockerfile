# --- Build Stage ---
    FROM oven/bun:1.0.25 AS builder

    WORKDIR /app
    
    COPY . .
    
    RUN bun install --no-progress
    RUN bun run nuxi build
    
    # --- Run Stage ---
    FROM oven/bun:1.0.25 AS runner
    
    WORKDIR /app
    
    COPY --from=builder /app/.output .output
    COPY --from=builder /app/package.json /app/bun.lockb ./
    
    RUN bun install --no-progress
    
    EXPOSE 3000
    
    CMD ["bun", ".output/server/index.mjs"]
    