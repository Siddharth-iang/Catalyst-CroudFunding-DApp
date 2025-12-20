import React from "react";
import {Link} from 'react-router-dom';
import { connectWallet, truncate } from "../services/Blockchain";
import { useGlobalState, setGlobalState } from "../store";

const Header = ()=>{
    const [connectedAccount] = useGlobalState('connectedAccount');

    return(
        <header className="flex justify-between items-center p-5 bg-white text-grey-500 hover:text-grey-700 shadow-lg fixed top-0 left-0 right-0">
            <Link to="/" className="flex items-center justify-start gap-2">
                <span><svg width="38" height="38" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M5 12L12 3L19 12M5 12L12 21L19 12M5 12L12 15L19 12" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/> </svg></span>
                <div className="text-3xl font-bold">Catalyst</div>
            </Link>

            <div className="flex space-x-2 justify-center">
                {connectedAccount ? (
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md" onClick={() => setGlobalState('connectedAccount', '')}>
                        {truncate(connectedAccount, 4, 4, 11)}
                    </button>
                ) : (
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md" onClick={() => connectWallet().catch((e) => console.log("Connection cancelled"))}>
                        CONNECT WALLET
                    </button>
                )}
            </div>
        </header>
    )
}

export default Header;