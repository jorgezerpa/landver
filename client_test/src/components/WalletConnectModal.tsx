"use client";
import React  from "react";
import { useConnect } from "@starknet-react/core";
import type { Connector } from "@starknet-react/core";
import { useRouter } from "next/navigation";
// import FadeLoader from "react-spinners/FadeLoader";
import { IoMdClose } from "react-icons/io";


const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Web Wallet"],
  ["argentMobile", "Argent mobile"],
]);
 
export function WalletConnectorModal({setShowWalletsModal}:{ setShowWalletsModal?:(value:boolean)=>void }) {

  const router = useRouter()
  const { connectors, connectAsync } = useConnect({  });

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
      if(setShowWalletsModal) setShowWalletsModal(false)
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      {/* {
        connecting && (
          <div className="h-72 flex justify-center items-center">
            <FadeLoader 
              color="#6E62E5"
              speedMultiplier={3}
              radius={30}
            />
          </div>
        )
      } */}
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex justify-center items-center" style={{ zIndex:1000 }}>
              <div className="bg-white rounded-lg py-6 max-w-[630px] w-full relative">
                <div
                  className="absolute top-6 right-6 cursor-pointer"
                  onClick={()=>{
                    if(!!setShowWalletsModal){
                      setShowWalletsModal(false)
                    }
                    if(!setShowWalletsModal){
                      router.push("/")
                    }
                  }}  
                >
                  <IoMdClose size={22} />
                </div>
                <p className="text-center text-xl font-semibold mb-7">Connect Wallet</p>
                <div className="w-[93%] mx-auto flex flex-col gap-3">
                  {connectors.map((connector, index) => {
                    // const isArgentMobile = connector.id === "argentMobile";
                    return (
                      <div key={connector.id+"connectwalletmodal"+index} onClick={() => connect(connector)} className="bg-[#F2FCFA] flex justify-center items-center rounded-md h-[65px] w-full shrink-0 hover:scale-95 transition-all cursor-pointer">
                        <div>
                          <p className="text-base text-center font-medium">{walletIdToName.get(connector.id) ?? connector.name}</p>
                          {/* <p className="text-base text-center ">Powered by Agent</p> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
        </div>
    </div>
  );
}