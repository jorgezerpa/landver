'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import { useConnect, useDisconnect, useAccount, useContract, useSendTransaction, useNonceForAddress } from "@starknet-react/core";

const OPTIONS = {
    owner: [
        { name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { name:"Verify Land", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Verify User", iconDisabled:"user.svg", iconEnabled:"user-selected.svg" },
        { name:"Transfer Ownership", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Reports and Logs", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
    ],
    inspector: [
        { name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { name:"Verify Land", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Verify User", iconDisabled:"user.svg", iconEnabled:"user-selected.svg" },
        { name:"Transfer Ownership", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Reports and Logs", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
    ],
    client: [
        { name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { name:"Market Store", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"My Collections", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Favorites", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
        { name:"Wallet", iconDisabled:"wallet.svg", iconEnabled:"wallet-selected.svg" },
    ],
}


export const Sidebar = () => {

  const { address, status, account} = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
    
  const [hoveredItem, setHoveredItem] = useState<null|number>(null)

  return (
    <div className="bg-white min-w-[290px] w-1/5 h-full hidden lg:block px-5 py-7">
      <Image className="cursor-pointer" alt="Landver" src={"/logo-and-name.svg"} height={38} width={157} /> 
      <div className="flex flex-col gap-10 pt-10">
        {
          OPTIONS["client"].map((item, index)=>{
            return (
              <div onMouseOver={()=>setHoveredItem(index)} onMouseLeave={()=>setHoveredItem(null)} className="flex items-center gap-2 cursor-pointer hover:scale-95 transition-all">
                {
                    hoveredItem===index
                    ? <Image alt="Landver" src={`/icons/sidebar/${item.iconEnabled}`} height={26} width={26} /> 
                    : <Image alt="Landver" src={`/icons/sidebar/${item.iconDisabled}`} height={26} width={26} />
                }
                <p className="text-[#7E8299] hover:text-[#6E62E5] transition-all text-base">{ item.name }</p> {/*#F0EFFC for purple bg*/}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
