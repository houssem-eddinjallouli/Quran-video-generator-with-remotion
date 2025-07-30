FROM node:22-bookworm-slim

# Install Chrome dependencies and Chrome
RUN apt-get update 
RUN apt install -y \
        libnss3 \
        libdbus-1-3 \
        libatk1.0-0 \
        libgbm-dev \
        libasound2 \
        libxrandr2 \
        libxkbcommon-dev \
        libxfixes3 \
        libxcomposite1 \
        libxdamage1 \
        libatk-bridge2.0-0 \
        libpango-1.0-0 \
        libcairo2 \
        libcups2 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ENV VIDEO_CACHE_SIZE_IN_BYTES=2097152000
# Expose ports as needed
EXPOSE 3911 3000

CMD ["sh", "-c", "npm run api & cd client && npm start"]
