# -----------------------
#  Bun + Vite React Build
# -----------------------

# Build stage
FROM oven/bun:latest AS build
WORKDIR /app

COPY bun.lockb package.json ./
COPY src ./src
COPY index.html ./

RUN bun install
RUN bun x vite build

# Run stage
FROM oven/bun:latest
WORKDIR /app

COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD ["bun", "serve", "dist"]
