import React from "react";
import { useGlobalState, setGlobalState } from "../store";

const Hero=()=>{
    const [stats] = useGlobalState('stats');

    return<>
         <div className="py-24 text-center bg-white text-gray-800">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
                <span className="capitalize">Raise your funds for the better on</span>
                <br/>
                <span className="uppercase">Catalyst.</span>
            </h1>

            <div className="space-x-2 flex justify-center items-center">
              <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md" onClick={()=>setGlobalState('createModal','scale-100')}>Create Campaign</button>
              <button type="button" className="bg-black py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md bg-transparent border border-black hover:bg-black hover:text-white text-black">Back Campaign</button>
            </div>

            <div className="flex justify-center items-center mt-10">
                <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
                   <span className="text-lg font-bold text-black leading-5">{stats?.totalProjects || 0}</span>
                   <span>Projects</span>
                </div>

                <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
                   <span className="text-lg font-bold text-black leading-5">{stats?.totalBacking || 0}</span>
                   <span>Backings</span>
                </div>

                <div className="flex flex-col justify-center items-center h-20 border border-gray-200 shadow-md w-full">
                   <span className="text-lg font-bold text-black leading-5">{stats?.totalDonations || 0} ETH</span>
                   <span>Donated</span>
                </div>
            </div>
         </div>
      </>
}

export default Hero;