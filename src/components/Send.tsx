import { FC, useState } from "react";
import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Connection } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { sendToken } from "../web3/transfer";

const useStyles = makeStyles((theme) => ({
  sendContainer: {
    alignItems: "left",
    background: "#765E67",
    flexDirection: "column",
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
    width: 600,
  },
  textField: {
    paddingBottom: 8,
    width: 600,
  },
  title: {
    height: 32,
    textAlign: "start",
    paddingBottom: 8,
    paddingTop: 8,
    color: theme.palette.secondary.contrastText,
  },
}));

interface SenderProps {
  connection: Connection;
  onTransactionCompleted: () => void;
}

const Send: FC<SenderProps> = ({ connection, onTransactionCompleted }) => {
  const { publicKey, signTransaction } = useWallet();
  const classes = useStyles();
  const [amount, setAmount] = useState(0);
  const [destAddress, setDestAddress] = useState("");

  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value ? Number(e.target.value) : 0);
  };

  const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestAddress(e.target.value ? e.target.value.toString() : "");
  };

  const isDisabled = () => {
    return amount <= 0 || destAddress.length === 0;
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await sendToken(
      connection,
      publicKey!,
      destAddress,
      signTransaction!,
      amount
    );
    onTransactionCompleted();
  };

  return (
    <form className={classes.sendContainer}>
      <Typography component="h1" variant="h5" className={classes.title}>
        Send Lamports
      </Typography>
      <Grid container direction="column" alignItems="flex-start">
        <TextField
          id="receiver"
          label="Receiver Address"
          className={classes.textField}
          onChange={handleChangeAddress}
          placeholder="6i6zaZdsV9R7JZKFAMNULCdMtzQCSK7ukUpdL4CdPy74"
          required
          variant="outlined"
          value={destAddress}
        />
        <TextField
          id="lamports"
          label="Lamports"
          className={classes.textField}
          onChange={handleChangeAmount}
          placeholder="10000"
          required
          variant="outlined"
          value={amount}
        />
        <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isDisabled()}
            onClick={handleSubmit}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Send;
