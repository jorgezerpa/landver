"use client";
import React, { useEffect } from "react";
import { useLoginStore } from "@/store/loginStore";
 
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  argent,
  braavos,
  useInjectedConnectors,
  voyager
} from "@starknet-react/core";
 
export function Providers({ children }: { children: React.ReactNode }) {
  const loginStore = useLoginStore()

  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [
      argent(),
      braavos(),
    ],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: "onlyIfNoConnectors",
    // Randomize the order of the connectors.
    order: "random"
  });

  useEffect(()=>{
    // ... any logic to get userType
    setTimeout(()=>loginStore.setUserType("client"), 2000)
  }, [])
 
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      { !loginStore.userType && <div>Loading</div> }
      { loginStore.userType && children }
    </StarknetConfig>
  );
}