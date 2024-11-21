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
import type { Connector } from "@starknet-react/core";

import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet"
 
export function Providers({ children }: { children: React.ReactNode }) {
  const loginStore = useLoginStore()

  const { connectors:injectedConnectors } = useInjectedConnectors({
    recommended: [
      argent(),
      braavos(),
    ],
    includeRecommended: "onlyIfNoConnectors",
    order: "random"
  });

  // const connectors = [
  //   //     ...injectedConnectors,
  //   new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
  //   new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
  //   new WebWalletConnector({ url: "https://web.argent.xyz" }),
  //   new ArgentMobileConnector(),
  // ] as Connector[];

  // Same as commented above, but shows Browser wallets only on browsers 
  const connectors = isInArgentMobileAppBrowser() ? [
    ArgentMobileConnector.init({
      options: {
        url:"",
        dappName: "Example dapp",
        projectId: "example-project-id",
      },
      inAppBrowserOptions: {},
    })
  ] as any : [
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" }}),
    new InjectedConnector({ options: { id: "argentX", name: "Argent X" }}),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    ArgentMobileConnector.init({
      options: {
        url:"",
        dappName: "Example dapp",
        projectId: "example-project-id",
      }
    })
  ] as any


  useEffect(()=>{
    setTimeout(()=>loginStore.setUserType("client"), 0)
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