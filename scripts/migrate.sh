#!/bin/bash

# Load environment variables from .env file
set -a
source .env
set +a

# Run the Prisma migration command
npx prisma migrate dev
