'use client'
import { useState } from "react";
import Image from "next/image";
import { useDisconnect, useAccount, useStarkProfile, useBalance } from "@starknet-react/core";


import { useBlockies } from "@/hooks/useBlockies";  

export function shortAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const Navbar = () => {

  const [showUserOptions, setShowUserOptions] = useState(false)

  const { disconnect } = useDisconnect()

  const { address } = useAccount(); // status --> "connected" | "disconnected" | "connecting" | "reconnecting";
  const { data: starkProfile } = useStarkProfile({ address });
  const { data } = useBalance({
    address: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  });

  const blockieImage = useBlockies({address})
  const profileImage = starkProfile?.profilePicture ?? blockieImage.blockiesImageSrc;

  return (
    <div className="bg-white py-5 px-5 flex items-center">
      <div className="relative w-4/6 hidden md:flex">
        <div className="flex justify-center items-center absolute top-0 bottom-0 left-1 w-[30px]">
          <Image width={22} height={22} alt="search" src={"/icons/common/search.svg"} className="" />
        </div>
        <input value={""} onChange={()=>{}} placeholder="Search..."  className="bg-gray-100 border border-none outline-none text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pl-10 " />
      </div>
      <div className="relative md:hidden flex-shrink-0">
        <div className="flex justify-center items-center w-[30px]">
          <Image width={22} height={22} alt="search" src={"/icons/common/search.svg"} className="" />
        </div>
      </div>
      <div className="flex justify-end items-center relative w-full md:w-2/6 gap-2">
        <div className="bg-gray-100 rounded-lg flex items-center gap-1 overflow-hidden pr-2.5">
          <div className=" p-1 m-1 md:p-1.5 md:m-1.5 bg-[#64748B] rounded-lg w-8 h-8 flex justify-center items-center flex-shrink-0">
            <Image src={"/icons/currencies/ether.svg"} width={30} height={30} alt="ether"/>
          </div>
          <p className="text-gray-500 font-medium text-sm md:text-base flex-shrink-0">{ data?.formatted.slice(0,4) } { data?.symbol }</p>
        </div>
        <div className="bg-gray-100 p-1 md:p-2 rounded-lg flex-shrink-0">
          <div className="flex justify-center items-center flex-shrink-0">
            <Image src={"/icons/common/notifications.svg"} width={30} height={30} alt="ether"/>
          </div>
        </div>
        <div className="relative cursor-pointer hover:scale-95 transition-all">
          <div className="bg-gray-200 rounded-full overflow-hidden h-8 w-8 md:h-12 md:w-12 relative">
            {
              profileImage && <Image onClick={()=>{setShowUserOptions(!showUserOptions)}} src={profileImage} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
            }
          </div>
          <div onClick={()=>{setShowUserOptions(!showUserOptions)}} className="absolute top-4 -right-1 w-4 h-4 md:top-6 md:-right-2 md:w-5 md:h-5">
              <Image src={"/icons/common/dropdown-arrow-purple-bubble.svg"} alt="ether" layout="fill" style={{ objectFit:"cover", objectPosition:"center" }} />
          </div>
          
          {
            showUserOptions &&
            <div
              onClick={()=>{
                const localStorage = window.localStorage;
                localStorage.removeItem("landver-connector")
                disconnect()
                setShowUserOptions(!showUserOptions)
              }}
              className="absolute top-[105%] right-0 shadow-sm shadow-gray-500 bg-white p-3 rounded-md"
            >
              <p className="text-gray-500 font-semibold hover:scale-95">Disconnect</p>
            </div>
          }

        </div>
      </div>
    </div>
  );
}
