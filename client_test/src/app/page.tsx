'use client'
import { useState, useEffect } from "react";
import type { Connector } from "@starknet-react/core";
import { useConnect, useDisconnect, useAccount,  } from "@starknet-react/core";

import { LandList } from "@/components/LandsList";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Email"],
  ["argentMobile", "Argent mobile"],
]);



export default function Home() {

  const { connectors, connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { address, status, connector } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const [showModal, setShowModal] = useState(false)
  const [connecting, setConnecting] = useState(true)

  async function connect(connector: Connector) {
    try {
      await connectAsync({ connector });
    } catch (error) {
      console.error(error);
      const localStorage = window.localStorage;
      localStorage.removeItem("landver-connector")
    }
  }


  useEffect(() => {
    (async()=>{
      if (status === "disconnected") {
        const localStorage = window.localStorage;
        if(localStorage.getItem("landver-connector")) {
          const selectedConnector = connectors.find(con => con.id === localStorage.getItem("landver-connector"))
          if(selectedConnector) await connect(selectedConnector)
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
    <div className="">
      {
        status === "connected" && <>
          <div className="flex justify-center items-center h-56">
            <div className="text-center font-bold text-xl">
              Welcome!
            </div>
          </div>
        </>
      }
      {
        status === "disconnected" && <>
          <div className="flex justify-center items-center h-56">
            <div className="text-center font-bold text-xl">
              Welcome!
            </div>
          </div>
        </>
      }


    </div>
  );
}
