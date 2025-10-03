# OM1 Multi-Wallet Adapter

Modular adapters for **WalletConnect v2** and **MetaMask**, plus a small demo (Sepolia).

## Demo videos
- WalletConnect v2: https://youtu.be/cYVlOdt4F2s
- MetaMask extension: https://youtu.be/3_D-PE3ZYBk

## Quick start
```bash
cp apps/demo/.env.example apps/demo/.env
# fill VITE_WC_PROJECT_ID (from cloud.walletconnect.com)
cd apps/demo
npx vite --host 0.0.0.0 --port 4321

Open via SSH tunnel: http://localhost:4321

Flows: Connect, Sign, Send Tx (testnet).
