# Bing Chun Nigeria

Standalone consumer landing page for Bing Chun Nigeria.

## Development

```bash
npm install
npm run dev
```

Copy the public values from `.env.example` when overriding the ZidiCommerce API or merchant slug locally. The site resolves its WhatsApp order link from the backend at runtime, so the destination remains tied to the correct ZidiCommerce merchant. Ordering controls wait for that verified channel and never fall back to a third-party marketplace.

## Production

```bash
npm run build
npm start
```

The production server uses Railway's `PORT` environment variable.
