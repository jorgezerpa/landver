"use client";
import React, { useEffect, useState } from "react";
import { useConnect, useDisconnect, useAccount, useContract, useSendTransaction } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";


const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Web Wallet"],
  ["argentMobile", "Argent mobile"],
]);
 
export function Providers({ children }: { children: React.ReactNode }) {

  const { connectors, connectAsync } = useConnect({  });
  const { address, status, account,isConnected , connector } = useAccount();

  const [connecting, setConnecting] = useState(true)

  const [currentModal, setCurrentModal] = useState<"intro"|"connect">("intro")

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async()=>{
      if (status === "disconnected") {
        const localStorage = window.localStorage;
        if(localStorage.getItem("landver-connector")) {
          const selectedConnector = connectors.find(con => con.id === localStorage.getItem("landver-connector"))
          selectedConnector && await connect(selectedConnector)
        }
        setConnecting(false)
      } else if (status === "connected") {
        setConnecting(false)
      }
    })()
  }, [address, status])

  // set connector used in LS to try to reconnect if user refresh screen or logs again (it's a kind of remember me)
  useEffect(()=>{
    if(connector?.id){
      const localStorage = window.localStorage;
      localStorage.setItem("landver-connector", connector.id)
    }
  }, [connector])


  return (
    <div>
      {
        connecting && (
          <div>loading</div>
        )
      }
      { (!connecting&&!!address) && children }
      { (!connecting&&!address) && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center" style={{ zIndex:1000 }}>
      
          {
            currentModal === "intro" && (
              <div className="bg-white rounded-lg px-7 py-6 max-w-[630px] w-full">
                <p className="text-center text-xl font-semibold mb-7">A Secure Platform for Land Registration, Inspection, and Validation on Starknet</p>
                <div className="w-[90%] mx-auto">
                  <p className="text-base font-medium mb-4">Effortless land registration with unique property IDs.</p>
                  <p className="text-base font-medium mb-4">Streamlined land inspection and verification for trusted records.</p>
                  <p className="text-base font-medium mb-4">Immutable, blockchain security for ownership and transactions</p>
                </div>
                <div className="w-[60%] mx-auto bg-[#6E62E5] rounded-md py-3 cursor-pointer" onClick={()=>setCurrentModal("connect")}>
                  <p className="text-white text-center">Connect wallet securely</p>
                </div>
              </div>

            )
          }
          {
            currentModal === "connect" && (
              <div className="bg-white rounded-lg py-6 max-w-[630px] w-full">
                <p className="text-center text-xl font-semibold mb-7">Connect Wallet</p>
                <div className="w-[93%] mx-auto flex flex-col gap-3">
                  {connectors.map((connector, index) => {
                    const isArgentMobile = connector.id === "argentMobile";
                    return (
                      <div key={connector.id+"connectwalletmodal"+index} onClick={() => connect(connector)} className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all">
                        <div>
                          <p className="text-base text-center font-medium">{walletIdToName.get(connector.id) ?? connector.name}</p>
                          {/* <p className="text-base text-center ">Powered by Agent</p> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            )
          }
  
        </div>
      ) }
    </div>
  );
}