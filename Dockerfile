FROM oven/bun:1.0.25

WORKDIR /app

COPY .output ./.output
COPY package.json bun.lockb ./

# No --production here
RUN bun install

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]
