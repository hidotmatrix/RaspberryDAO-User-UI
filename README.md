## RaspberryDAO-User-UI

RaspberryDAO-User-UI Project is a frontend of RaspberryDAO ecosystem which is used for the users to swap NFTs using [RaspberryDAO-Backend](https://github.com/hidotmatrix/RaspberryDAO-Backend) real time event listners and mint NFTs in users wallet on Godwoken chain.

## RaspberryDAO

RaspberryDAO is an ERC20 based governance mechanism.

DAOs are an effective and safe way to work with like-minded folks around the globe.

Think of them like an internet-native business that's collectively owned and managed by its members. They have built-in treasuries that no one has the authority to access without the approval of the group. Decisions are governed by proposals and voting to ensure everyone in the organization has a voice. [Read More About DAOs](https://ethereum.org/en/dao/)

---

### Clone repository

```bash
git clone https://github.com/hidotmatrix/RaspberryDAO-User-UI.git
```

---

### Installation

```bash
cd RaspberryDAO-User-UI
npm install
```

---


Create a .env file in the root directory and add the following variables

- `REACT_APP_ALCHEMY_RPC_URL = ""`
- `REACT_APP_GODWOKEN_RPC_URL= ""`
---

### Frontend Interaction

```bash
npm start
```

#### Wallet support

Used rainbowkit for the wallet Interaction. [rainbowkit docs](https://www.rainbowkit.com/docs/introduction)
