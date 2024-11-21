"use client";
import React, { useEffect } from "react";

import FadeLoader from "react-spinners/FadeLoader";

import { useLoginStore } from "@/store/loginStore";
 
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  StarknetConfig,
  publicProvider,
  voyager
} from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";

import { InjectedConnector } from "starknetkit/injected"
import { ArgentMobileConnector, isInArgentMobileAppBrowser } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet"
 
export function Providers({ children }: { children: React.ReactNode }) {
  const loginStore = useLoginStore()

  const connectors = isInArgentMobileAppBrowser() ? [
    ArgentMobileConnector.init({
      options: {
        url:"",
        dappName: "Example dapp",
        projectId: "example-project-id",
      },
      inAppBrowserOptions: {},
    })
  ] as Connector[] : [
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
  ] as Connector[]


  

  useEffect(()=>{
    // setTimeout(()=>loginStore.setUserType("client"), 0)
    loginStore.setUserType("client")
  }, [])
 
  return (
    <StarknetConfig
      chains={[mainnet, sepolia]}
      provider={publicProvider()}
      connectors={connectors}
      explorer={voyager}
    >
      { !loginStore.userType && (
        <div className="h-72 flex justify-center items-center">
          <FadeLoader 
            color="#6E62E5"
            speedMultiplier={3}
            radius={30}
          />
        </div>
      ) }
      { loginStore.userType && children }
    </StarknetConfig>
  );
}