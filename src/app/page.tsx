"use client"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider, useAccount } from 'wagmi'
import { config } from './config'
import { Account } from './account' 
import { WalletOptions } from './wallet-options' 
import { SendTransaction } from './SendTransaction';
import { MintNft } from './NFTContract';

const queryClient = new QueryClient()

function ConnectWallet() { 
  const { isConnected } = useAccount() 
  if (isConnected) {
    return (
      <>
       <Account /> 
        <SendTransaction />
        <MintNft /> 
      </>
    );
  }
 
  return <WalletOptions /> 
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        <ConnectWallet /> 
      </QueryClientProvider> 
    </WagmiProvider>
  )
}
