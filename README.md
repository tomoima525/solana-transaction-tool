# Solana Transaction Tool

- This React Application showcases the usage of [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter) and [Solana web3](https://github.com/solana-labs/solana-web3.js)
  - Connect to Phantom Wallet
  - Show transactions of a connected account
  - Send lamports through the application using Phantom Wallet



https://user-images.githubusercontent.com/6277118/131388004-f6423aa3-72ef-404e-85ce-de67dff85ae0.mov

# Prerequisite

- Install Phantom Wallet and set your account 

# How to run

```
$ yarn install
$ yarn start
```

By default this app points to "devnet". If you want to point it to the different network, update [clusterApiUrl](https://github.com/tomoima525/solana-transaction-tool/blob/main/src/screens/Home.tsx#L23)

# How does it work?
### Connecting Wallet

- [WalletProvider](https://github.com/tomoima525/solana-transaction-tool/blob/main/src/components/Wallet.tsx#L32-L33) automatically requrests the access to your Wallet

```
    <WalletProvider wallets={[PhantomWallet]} onError={onError} autoConnect>
      <WalletDialogProvider>{children}</WalletDialogProvider>
    </WalletProvider>
```

- Once that succeeds, you can access your wallet through [useWallet](https://github.com/tomoima525/solana-transaction-tool/blob/main/src/screens/Home.tsx#L26) hooks 
- `useWallet` provides wallet information(publicKey, icon) and functionality to sign your transaction

### Viewing transactions

- You need to fetch transaction signatures using [web3.Connection](https://github.com/tomoima525/solana-transaction-tool/blob/main/src/web3/transaction.ts#L11)
- We can retrieve transactions using that signatures
```
  const transSignatures = await connection.getConfirmedSignaturesForAddress2(
    address
  );
  for (let i = 0; i < transSignatures.length; i++) {
    const signature = transSignatures[i].signature;
    const confirmedTransaction = await connection.getConfirmedTransaction(
      signature
    );
    if (confirmedTransaction) {
      const transWithSignature = {
        signature,
        confirmedTransaction,
      };
      transactions.push(transWithSignature);
    }
  }
```

### Sending transactions
- First create `instruction`.
```
    const instruction = SystemProgram.transfer({
      fromPubkey: address!,
      toPubkey: destPubkey,
      lamports,
    });
```

- Create a `transaction` with `feePayer`(usually yourself), `recentBlockHash`(this ensures that this transaction is legit) and `instruction`

```
  const recentBlockhash = await connection.getRecentBlockhash();
  console.log({ recentBlockhash });
  const options: TransactionCtorFields = {
    feePayer,
    recentBlockhash: recentBlockhash.blockhash,
  };
  const transaction = new Transaction(options);
  transaction.add(instruction);
```

- Sign your `transaction` and send it to the network
```
const { signTransaction } = useWallet();

const signedTrans = await signTransaction(transaction);
const signature = await connection.sendRawTransaction(
    signedTrans.serialize()
);
```

- Finally confirm your transaction

```
await connection.confirmTransaction(signature, "confirmed");
```

P.S. If you think this code was useful, tip me some SOL!  `6i6zaZdsV9R7JZKFAMNULCdMtzQCSK7ukUpdL4CdPy74`
