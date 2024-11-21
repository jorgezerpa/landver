"use client";
import React, { useEffect, useState } from "react";
import { useConnect, useDisconnect, useAccount, useContract, useSendTransaction } from "@starknet-react/core";

 
export function Providers({ children }: { children: React.ReactNode }) {

  const { connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, status, account,isConnected , connector } = useAccount();

  const [currentModal, setCurrentModal] = useState<"intro"|"connect">("intro")

  return (
    <div>
      { !!address && children }
      { !address && (
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
                  <div className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all">
                    <div>
                      <p className="text-base text-center font-medium">Web Wallet</p>
                      <p className="text-base text-center ">Powered by Agent</p>
                    </div>
                  </div>
                  <div className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all">
                    <div>
                      <p className="text-base text-center font-medium">Argent X</p>
                    </div>
                  </div>
                  <div className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all">
                    <div>
                      <p className="text-base text-center font-medium">Argent Mobile</p>
                    </div>
                  </div>
                  <div className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all">
                    <div>
                      <p className="text-base text-center font-medium">Braavos</p>
                    </div>
                  </div>
                </div>
              </div>

            )
          }
  
        </div>
      ) }
    </div>
  );
}