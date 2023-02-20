# Tact contracts and TS interfaces

```bash
yarn test # To test contract
yarn build # To build contract
yarn deploy # To deploy contract
```

[Tact documentation.](https://github.com/ton-community/tact/blob/main/docs/overview.md)

##

Create edition process:

1. Deploy manager. yarn deploy => manager.deploy.ts
2. Copy manager address to frontend code as owner and deploy collection
3. Update collection address in manager. yarn deploy => manager.updateCollectionAddress.ts

4. Make sure everything ok with yarn deploy => manager.get

New flow

1. Calculate nft manager address (owner=creator, content...)
2. Calculate nft collection address (owner=nft manager, content...)
3. Compose messages:

- 3.1 nft manager (stateinit(data(1) + code) + body (nft collection address(2)))
- 3.2 nft collection (stateinit(data(2) + code))

4. Deploy 2 messages from (3)
   =>
5. [ton]

Mint via manager:

1. yarn deploy -> manager.mint

## Licence

MIT
