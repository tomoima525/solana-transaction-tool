import { FC, useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { getTransactions, TransactionWithSignature } from "../web3/transaction";
import TransactionsView from "../components/Transactions";
import Send from "../components/Send";

const useStyles = makeStyles((theme) => ({
  container: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
    paddingBottom: theme.spacing(4),
  },
  root: {
    display: "flex",
  },
}));

// Change Network by updating clusterApiUrl!
const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

const Home: FC = () => {
  const { publicKey } = useWallet();
  const [transactions, setTransactions] =
    useState<Array<TransactionWithSignature>>();
  const classes = useStyles();

  useEffect(() => {
    const fetchTransactions = async () => {
      if (publicKey) {
        const transactions = await getTransactions(connection, publicKey);
        setTransactions(transactions);
      }
    };
    fetchTransactions();
  }, [publicKey]);

  // Update the list after the transaction
  const handleOnTransaction = async () => {
    if (publicKey) {
      const transactions = await getTransactions(connection, publicKey);
      setTransactions(transactions);
    }
  };

  return (
    <div className={classes.root}>
      <Container maxWidth="lg" className={classes.container}>
        {publicKey && (
          <Send
            connection={connection}
            onTransactionCompleted={handleOnTransaction}
          />
        )}
        <TransactionsView transactions={transactions} publicKey={publicKey!} />
      </Container>
    </div>
  );
};
export default Home;
