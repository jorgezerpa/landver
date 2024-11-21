'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import { useConnect, useDisconnect, useAccount, useContract, useSendTransaction, useNonceForAddress } from "@starknet-react/core";

import { useRouter, usePathname } from "next/navigation";
import { useLoginStore } from "@/store/loginStore";

const OPTIONS = {
    owner: [
        { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { path:"/verify-land", name:"Verify Land", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/verify-user", name:"Verify User", iconDisabled:"user.svg", iconEnabled:"user-selected.svg" },
        { path:"/transfer-ownership", name:"Transfer Ownership", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/reports-and-logs", name:"Reports and Logs", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
      ],
    inspector: [
      { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
      { path:"/verify-land", name:"Verify Land", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/verify-user", name:"Verify User", iconDisabled:"user.svg", iconEnabled:"user-selected.svg" },
      { path:"/transfer-ownership", name:"Transfer Ownership", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/reports-and-logs", name:"Reports and Logs", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
      { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
    ],
    client: [
        { path:"/dashboard", name:"Dashboard", iconDisabled:"dashboard.svg", iconEnabled:"dashboard-selected.svg" },
        { path:"/market-store", name:"Market Store", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/my-collections", name:"My Collections", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/favorites", name:"Favorites", iconDisabled:"shared.svg", iconEnabled:"shared-selected.svg" },
        { path:"/notifications", name:"Notifications", iconDisabled:"notifications.svg", iconEnabled:"notifications-selected.svg" },
        { path:"/wallet", name:"Wallet", iconDisabled:"wallet.svg", iconEnabled:"wallet-selected.svg" },
    ],
}


export const Sidebar = () => {
  const loginStore = useLoginStore()

  const router = useRouter()
  const pathname = usePathname()

  const { address, status, account} = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
    
  const [hoveredItem, setHoveredItem] = useState<null|number>(null)

  return (
    <div className="bg-white min-w-[290px] w-1/5 h-full hidden lg:block px-5 py-7" style={{ boxShadow:"1px 0px 2px rgba(0, 0, 0, 0.1)", zIndex:1000 }}>
      <Image className="cursor-pointer" alt="Landver" src={"/logo-and-name.svg"} height={38} width={157} /> 
      <div className="flex flex-col pt-10 gap-6">
        {
          !!loginStore.userType && OPTIONS[loginStore.userType].map((item, index)=>{
            return (
              <div key={"sidebar-desktop-id"+index} onClick={()=>router.push(item.path)} onMouseOver={()=>setHoveredItem(index)} onMouseLeave={()=>setHoveredItem(null)} className={`rounded-md flex items-center gap-2 cursor-pointer hover:scale-95 transition-all ${pathname.includes(item.path)?"bg-[#F0EFFC]":""} py-4 px-2`}>
                {
                    (pathname.includes(item.path) || hoveredItem===index)
                    ? <Image alt="Landver" src={`/icons/sidebar/${item.iconEnabled}`} height={26} width={26} /> 
                    : <Image alt="Landver" src={`/icons/sidebar/${item.iconDisabled}`} height={26} width={26} />
                }
                <p className={` ${pathname.includes(item.path)?"text-[#6E62E5]":"text-[#7E8299]"} hover:text-[#6E62E5] transition-all text-base`}>{ item.name }</p> {/*#F0EFFC for purple bg*/}
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
