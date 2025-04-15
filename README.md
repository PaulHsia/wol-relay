# Wake-on-LAN Relay

A simple Node.js WOL relay server that listens for HTTP requests and sends a magic packet to wake a computer.

## Setup

1. Install dependencies:

```
npm install
```

2. Create a `.env` file based on `.env.example`.

3. Start the server:

```
npm start
```

## Deploy to Railway

1. Push this repo to GitHub.
2. Connect the repo in Railway.
3. Set environment variables:

- `PASSWORD`: Authentication password
- `TARGET_MAC`: MAC address to wake (e.g., B4-2E-xx-xx-xx-xx)
- `TARGET_PORT`: Usually 9
- `BROADCAST_ADDR`: Usually 255.255.255.255

4. Access: `https://your-railway-url/wake?pw=123456`
