# A basic Account Abstraction test with Alchemy aa-sdk

A basic Account Abstraction implementation with `aa-sdk` from Alchmy SDK following [the AA Quick Start](https://accountkit.alchemy.com/getting-started/setup.html#_1-install-the-packages).
This project aim to initiate a transaction with an EOA for a smart contract and not paying for gasfees.

## Behaviour

- An authenticated user with an **EOA** initiate a transaction (because s•he wants to interact with smart contract) and sign it.
- The **UserOp** (read it _UserOperation_) is a meta-transaction containing a lot of informations and is sent to the **Bundler**.
- The **Bundler** gather multiple Userops from multiple EOA users, verify operations, bundle them in one transaction to save gaasfees and send them to the **Entrypoint**.
- The **Entrypoint** officiate and will calculate gasfees consumption and verify who will pay the **Smart Contract Account**, most of the time we can assign a contract called the **Paymaster** to pay the bills.
- The **Paymaster** will allow the **Smart Contract Account** to use the funds to operate changes onchain on behalf of the EOA.

## TLDR

```
Smart Account Address:  0xF667523C4De2e9d6dB27Dce6Eb3b31217C234f5a
From 0xF667523C4De2e9d6dB27Dce6Eb3b31217C234f5a to 0x885D06b3630975EaA0f7313934224C2523a30B7d
UserOperation Hash:  0xe1f04ff4b9d9834dd1d7fd2ab71121b81f0cd254d2de00a0991bb604f3e80454
Transaction Hash:  0x0444baf9ba4f537e0d41a955ddbee6f30bc1f1cea4c53be988bcf3ff21849a58
✨  Done in 10.71s.
```

Here you can see that

1. We deployed a Smart Account Contract at `0xF667523C4De2e9d6dB27Dce6Eb3b31217C234f5a` for the EOA `0x665D1C0F349eB3E8377D45A351D6212833478138` (cf use of private key in `.env` file).
   > _Look the [Smart Account Address on Polygon Mumbai](https://mumbai.polygonscan.com/address/0xF667523C4De2e9d6dB27Dce6Eb3b31217C234f5a)_
2. The EOA initiated a transaction toward the address `0x885D06b3630975EaA0f7313934224C2523a30B7d`.
   > _Check the [EOA history on Polygon Mumbai explorer](https://mumbai.polygonscan.com/address/0x665D1C0F349eB3E8377D45A351D6212833478138)_
3. The UserOp `0xe1f04ff4b9d9834dd1d7fd2ab71121b81f0cd254d2de00a0991bb604f3e80454` has been created.
   > _Check the UserOp on [jiffyscan.xyz](https://jiffyscan.xyz/userOpHash/0xe1f04ff4b9d9834dd1d7fd2ab71121b81f0cd254d2de00a0991bb604f3e80454?network=mumbai) (an EIP-4337 UserOp Explorer)_
4. The transaction `0x0444baf9ba4f537e0d41a955ddbee6f30bc1f1cea4c53be988bcf3ff21849a58` has been validated
   > _Check the [Transaction on Mumbai explorer](https://mumbai.polygonscan.com/tx/0x0444baf9ba4f537e0d41a955ddbee6f30bc1f1cea4c53be988bcf3ff21849a58)_
5. The Mumbai Testnet official Paymaster has been used
   > _Check the [Mumbaï Paymaster history](https://jiffyscan.xyz/paymaster/0xc03aac639bb21233e0139381970328db8bceeb67?network=mumbai)_

# Resources

- [YT - AA Series](https://youtu.be/NM04uxcCOEw?feature=shared)
- [Gas Manager Deployment Addresses](https://docs.alchemy.com/reference/gas-manager-deployment-addresses)
