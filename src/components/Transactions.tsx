import { FC } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import { TransactionWithSignature } from "../web3/transaction";
import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    description: {
      color: "gray",
      textAlign: "start",
    },
    title: {
      color: "black",
      textAlign: "start",
      marginTop: 4,
      marginBottom: 4,
    },
    paper: {
      background: "white",
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  })
);

interface TransactionItemProps {
  publicKey: PublicKey;
  transaction: TransactionWithSignature;
}

const mask = (address: String) =>
  `${address.slice(0, 4)}...${address.slice(
    address.length - 4,
    address.length
  )}`;

const TransactionItem: FC<TransactionItemProps> = ({
  publicKey,
  transaction,
}: TransactionItemProps) => {
  const classes = useStyles();
  const meta = transaction.confirmedTransaction.meta;
  const trans = transaction.confirmedTransaction.transaction;
  const time = new Date(
    transaction.confirmedTransaction.blockTime! * 1000
  ).toLocaleString();
  const sender = trans.instructions[0].keys[0].pubkey.toBase58();
  const receiver = trans.instructions[0].keys[1].pubkey.toBase58();

  let amount = 0;
  if (meta) {
    amount = meta.preBalances[0] - meta.postBalances[0];
  }

  let yourSelf = "";
  if (sender === publicKey.toBase58()) {
    yourSelf = "(You)";
  }

  const maskedSender = mask(sender);
  const maskedReceiver = mask(receiver);

  return (
    <Paper className={classes.paper}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item xs zeroMinWidth>
          <Typography
            variant="h6"
            component="h6"
            className={classes.title}
            noWrap
          >
            Sender: {maskedSender} {yourSelf}
          </Typography>
          <Typography className={classes.description}>
            Receiver:{maskedReceiver}
          </Typography>
          <Typography className={classes.description}>
            Sender Balance: {(meta?.postBalances[0] || 0) / LAMPORTS_PER_SOL}SOL
          </Typography>
          <Typography className={classes.description}>
            Sent Amount: {amount / LAMPORTS_PER_SOL}SOL, (including Fee:{" "}
            {(meta?.fee || 0) / LAMPORTS_PER_SOL}SOL)
          </Typography>
          <Typography className={classes.description}></Typography>
          <Typography className={classes.description}>
            TransactionTime(confirmedBlockTime): {time}
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
};

interface TransactionsViewProps {
  publicKey: PublicKey;
  transactions?: Array<TransactionWithSignature>;
}

const TransactionsView: FC<TransactionsViewProps> = ({
  publicKey,
  transactions,
}) => {
  if (!transactions) {
    return <div>No Items to show. Please connect the wallet.</div>;
  }
  return (
    <>
      {transactions.map((trans) => (
        <TransactionItem
          key={trans.signature}
          transaction={trans}
          publicKey={publicKey}
        />
      ))}
    </>
  );
};

export default TransactionsView;
