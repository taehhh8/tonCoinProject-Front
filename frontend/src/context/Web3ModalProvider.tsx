"use client";

import { createWeb3Modal, defaultConfig } from "@web3modal/ethers5/react";

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!projectId) {
  throw new Error("WALLET_CONNECT_PROJECT_ID 환경 변수가 설정되지 않았습니다.");
}
// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const optimism = {
  chainId: 10,
  name: "Optimism",
  currency: "ETH",
  explorerUrl: "https://optimistic.etherscan.io/",
  rpcUrl: "https://mainnet.optimism.io",
};

// 3. Create modal
const metadata = {
  name: "Staking KHANS",
  description: "staking.khans.io",
  url: "https://staking.khans.io/dashboard", // origin must match your domain & subdomain
  icons: ["https://staking.khans.io/favicon.ico"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, optimism],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  // themeMode: "light",
  // themeVariables: {
  //   "--w3m-color-mix": "#FFFFFFCC",
  //   "--w3m-color-mix-strength": 40,
  // },
});

interface Web3ModalProps {
  children: React.ReactNode; // children의 타입을 React.ReactNode로 지정합니다.
}

export function Web3ModalProvider({ children }: Web3ModalProps) {
  return <>{children}</>; // children을 렌더링합니다.
}
