import React, { FC } from "react";
import { WalletError } from "@solana/wallet-adapter-base";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { WalletProvider } from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { useSnackbar } from "notistack";

export const ICONS_URL =
  "https://raw.githubusercontent.com/solana-labs/wallet-adapter/master/packages/wallets/icons";

interface WalletProps {
  children: React.ReactNode | React.ReactNode[];
}
const Wallet: FC<WalletProps> = (props: WalletProps) => {
  const { children } = props;
  const { enqueueSnackbar } = useSnackbar();
  const PhantomWallet: any = {
    name: "Phantom",
    url: "https://www.phantom.app",
    icon: `${ICONS_URL}/phantom.svg`,
    adapter: () => new PhantomWalletAdapter(),
  };
  const onError = (error: WalletError) => {
    enqueueSnackbar(
      error.message ? `${error.name}: ${error.message}` : error.name,
      { variant: "error" }
    );
    console.error(error);
  };
  return (
    <WalletProvider wallets={[PhantomWallet]} onError={onError} autoConnect>
      <WalletDialogProvider>{children}</WalletDialogProvider>
    </WalletProvider>
  );
};

export default Wallet;
