FROM oven/bun:1.0.25

WORKDIR /app

COPY .output ./.output
COPY package.json bun.lockb ./

RUN bun install --production

EXPOSE 3000

CMD ["bun", ".output/server/index.mjs"]
