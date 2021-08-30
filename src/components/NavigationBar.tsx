import { FC } from "react";
import { Toolbar, Typography } from "@material-ui/core";
import DisconnectIcon from "@material-ui/icons/LinkOff";
import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-material-ui";
import { useWallet } from "@solana/wallet-adapter-react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    display: "flex",
  },
}));

const Navigation: FC = () => {
  const { wallet, publicKey } = useWallet();
  console.log("+===", publicKey?.toBase58());
  const classes = useStyles();
  return (
    <Toolbar className={clsx(classes.toolbar)}>
      <Typography component="h1" variant="h6" style={{ flexGrow: 1 }}>
        Solana Transaction App
      </Typography>
      <WalletMultiButton />
      {wallet && (
        <WalletDisconnectButton
          startIcon={<DisconnectIcon />}
          style={{ marginLeft: 8 }}
        />
      )}
    </Toolbar>
  );
};

export default Navigation;
