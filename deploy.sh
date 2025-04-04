#!/bin/bash

# Exit on error
set -e

# Build and deploy web app
echo "Building web app..."
cd apps/web
npm run build
docker build -t all-service-hemma-web .

# Start services with Docker Compose
echo "Starting services..."
cd ../..
docker-compose up -d

# Run database migrations
echo "Running database migrations..."
cd apps/web
npm run prisma:migrate

# Seed the database
echo "Seeding the database..."
npm run prisma:seed

echo "Deployment completed successfully!" 