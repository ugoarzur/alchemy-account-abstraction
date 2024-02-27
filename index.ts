import 'dotenv/config'

import { createModularAccountAlchemyClient } from '@alchemy/aa-alchemy'
import {
  Address,
  LocalAccountSigner,
  polygonMumbai,
  type Hex,
} from '@alchemy/aa-core'

const chain = polygonMumbai

// The private key of your EOA that will be the signer to connect with the Modular Account
// Our recommendation is to store the private key in an environment variable
const privateKey = `0x${process.env.PRIVATE_KEY}` as Hex
const alchemyKey = process.env.ALCHEMY_KEY
const vitalikAddress = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045' as Address
const targetedAddress =
  (process.env.TARGETED_ADDRESS as Address) || vitalikAddress
const alchemyPolicyId = process.env.ALCHEMY_POLICY_ID as string | undefined

if (!alchemyKey) {
  throw new Error('Need Alchemy Key.')
}
if (!privateKey) {
  throw new Error('Need a private key.')
}
if (!alchemyPolicyId) {
  throw new Error('Need a gas policy id.')
}

const signer = LocalAccountSigner.privateKeyToAccountSigner(privateKey)
//TODO: We could call an Create Policy endpoint if we need to dynamically create it.
// https://docs.alchemy.com/reference/create-policy

// Create a smart account client to send user operations from your smart account
const client = await createModularAccountAlchemyClient({
  // get your Alchemy API key at https://dashboard.alchemy.com
  apiKey: alchemyKey,
  chain,
  signer,
  gasManagerConfig: {
    policyId: alchemyPolicyId,
  },
})

;(async () => {
  // Fund your account address with ETH to send for the user operations
  // (e.g. Get Sepolia ETH at https://sepoliafaucet.com)
  console.log('Smart Account Address: ', client.getAddress()) // Log the smart account address
  console.log(`From ${client.getAddress()} to ${targetedAddress}`)
  // Send a user operation from your smart account to targetedAddress (custom adress or Vitalik's adress) that does nothing
  const { hash: uoHash } = await client.sendUserOperation({
    uo: {
      target: targetedAddress, // The desired target contract address
      data: '0x', // The desired call data
      value: 0n, // (Optional) value to send the target contract address
    },
  })

  console.log('UserOperation Hash: ', uoHash) // Log the user operation hash

  // Wait for the user operation to be mined
  const txHash = await client.waitForUserOperationTransaction({
    hash: uoHash,
  })

  console.log('Transaction Hash: ', txHash) // Log the transaction hash
})()
