# Stage 1: Install dependencies and build the Next.js project
FROM node:18-alpine AS installer
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app
# Assuming your Next.js project is located in a directory named 'web'
COPY ./web .
RUN pnpm install
RUN pnpm run build

# Stage 2: Build the Go application
FROM golang:alpine as builder
LABEL author="Sonny <sonny.prayogo@gmail.com>"
WORKDIR /app
# Copy only the necessary directories and files for Go build
# Adjust the paths according to your project structure
COPY . .
# Copy the built Next.js project from the previous stage
COPY --from=installer /app/dist ./dist
RUN go mod download
# Adjust the build command according to your project's structure
RUN go build -o pb main.go

# Stage 3: Setup the runtime container
FROM alpine:latest
WORKDIR /app
# Copy the built Go binary
COPY --from=builder /app/pb .
EXPOSE 3000