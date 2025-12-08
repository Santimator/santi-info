# Use a minimal, stable Debian image for a slim footprint
FROM debian:stable-slim

# Set environment variables for non-interactive installs
ENV DEBIAN_FRONTEND=noninteractive

# 1. Install dependencies (curl, git, wget, dpkg)
#    --no-install-recommends is added here for smaller image size!
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl \
    git \
    wget \
    dpkg \
    ca-certificates \
    # Clear cache to keep the image small
    && rm -rf /var/lib/apt/lists/*

# 2. Install Hugo Extended and verify
ARG HUGO_VERSION=0.120.4
RUN wget -O /tmp/hugo.deb https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/hugo_extended_${HUGO_VERSION}_linux-amd64.deb \
    && dpkg -i /tmp/hugo.deb \
    && rm /tmp/hugo.deb \
    && hugo version # <-- Installation verification

# 3. Install OpenCode AI
RUN curl -fsSL https://opencode.ai/install | bash

# 4. Configure User and Workspace
RUN useradd -ms /bin/bash devuser
USER devuser
WORKDIR /home/devuser/project

CMD ["/bin/bash"]
