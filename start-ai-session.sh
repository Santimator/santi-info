#!/bin/bash

# --- Configuration ---
IMAGE_NAME="opencode-hugo-sandbox"
CONTAINER_NAME="opencode_sandbox"
AUTH_PATH="$HOME/.local/share/opencode/auth.json"
PROJECT_PATH="/home/devuser/project"
AUTH_CONTAINER_PATH="/home/devuser/.local/share/opencode/auth.json"

# --- 1. Preparation: Pull latest changes from the host ---
echo "--- 1. Pulling latest changes from repository ---"
git pull || { echo "ERROR: git pull failed. Fix conflicts before running."; exit 1; }

# Check if the auth file exists before proceeding
if [ ! -f "$AUTH_PATH" ]; then
    echo "ERROR: OpenCode authentication file not found at $AUTH_PATH."
    echo "Please run 'opencode auth login' on the host first."
    exit 1
fi

# --- 2. Run the Docker Container and Execute OpenCode ---
echo "--- 2. Starting isolated container and running OpenCode ---"
echo "--- The AI is now sandboxed within the container. ---"

# The command structure:
# docker run: Start the container
# -it: Interactive terminal
# --rm: Automatically remove the container when you exit (keeps your system clean)
# -v: Volume mounts for project directory and auth file
# IMAGE_NAME: The image we built earlier
# /bin/bash -c "opencode": This is the new part. It tells the container's shell 
# to immediately execute the 'opencode' command when the container starts.

docker run -it --rm \
    -v "$(pwd)":$PROJECT_PATH \
    -v "$AUTH_PATH":$AUTH_CONTAINER_PATH:ro \
    --name "$CONTAINER_NAME" \
    "$IMAGE_NAME" \
    /bin/bash -c "opencode"

# --- 3. Wrap-up ---
echo "--- 3. AI Session Complete. Container destroyed. ---"
echo "Review the changes locally and run 'git commit' on the host to save."

exit 0
