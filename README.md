<a href="https://pi.oberton.io/#/">
    <img src="https://i.ibb.co/H7GmT54/pixel.png" alt="Pixel logo" title="3.14xl" align="right" height="60" />
</a>

# 3.14XL

### Description

3.14XL NFT creation tool bring your visions to life with ease! <br> Create captivating NFT projects
that can be scaled up from a single token to a whole collection. Whether you are just starting out
or have been in the game for a while, it's never been easier to build something remarkable.

### Project structure

`src` - contains source code of the application <br> `src/contracts` - contains
source code of smart contracts <br> Contracts used in the application are:

- `src/contracts/nft-collection.fc` - NFT collection contract, TEP-62 compliant
- `src/contracts/nft-item.fc` - NFT item contract, TEP-62 compliant
- `src/contracts/nft-manager.tact` - NFT manager contract, that manages NFT collection, and
  settings and functionality related to NFT edition

`src/wrappers` - contains Typescript wrapper classes used to deploy and interact with
according contracts, and `*.spec.ts` files used to test one

`.github/workflows` - contains `.yaml` deployment workflows

### Run the project

Install dependencies

```
yarn
```

To start local development

```
yarn dev
```

To make a build

```
yarn build
```

## Build a contract

To build `Tact` contract

```
yarn build:contracts
```

## Run tests

To test smart contracts

```
yarn test
```

## Supplementary repositories

- [Telegram Bot](https://github.com/theoberton/3.14xl-backend/tree/main/telegram-web-app-bot/) -
  Telegram WebApp of [3.14xl](https://pi.oberton.io/) with cool and handy editions managment
- [Explore feature backend](https://github.com/theoberton/3.14xl-backend/tree/main/explore)

## License

3.14XL is licensed under the MIT License

## Links

- [3.14XL Website](https://pi.oberton.io/)
- [3.14XL Telegram Bot and TWA](https://t.me/pixelObertonbot)
- [Organization source code](https://github.com/theoberton/)
