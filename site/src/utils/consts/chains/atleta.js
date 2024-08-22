import { ReactComponent as Polkadot } from "../../../components/icons/polkadot.svg";
import { governanceModules, treasuryModules } from "./modules";
import { polkadotColor } from "./common";

const atleta = {
  name: "Atleta",
  icon: <Polkadot />,
  identity: "atleta",
  sub: "polkadot",
  value: "atleta",
  chain: "atleta",
  symbol: "Atla",
  decimals: 18,
  chainIcon: "originalPolkadot",
  ...polkadotColor,
  buttonColor: "#E6007A",
  logo: "logo-img-2",
  modules: {
    ...treasuryModules,
    ...governanceModules,
    identity: false,
    multisig: true,
    vestings: false,
  },
  // treasuryWebsite: "https://polkadot.dotreasury.com",
  // subSquareWebsite: "https://polkadot.subsquare.io",
  nodes: [
    { name: "Atleta Netowrk", url: "wss://testnet-rpc.atleta.network:9944" },
  ],
  useOnChainBlockData: true,
};

export default atleta;
