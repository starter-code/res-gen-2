#!/bin/sh

# Load environment variables from .env
if [ -f .env ]; then
  export $(cat .env | grep -v '#' | awk '/=/ {print $1}')
fi

# Your shell command that uses the environment variable
echo "GH_TOKEN is: $GH_TOKEN"

# Replace the following line with your actual shell command
# Example: node your_script.js
npx semantic-release --dry-run
