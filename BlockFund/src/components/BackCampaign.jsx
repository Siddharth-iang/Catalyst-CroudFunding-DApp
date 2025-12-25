import React, { useState } from "react";
import {FaTimes} from 'react-icons/fa';
import { useGlobalState,setGlobalState } from "../store";
import { toast } from "react-toastify";
import { backProject } from "../services/Blockchain";

const BackCampaign = () =>{
    const [backModal] = useGlobalState('backModal');
    const [project] = useGlobalState('project');
    const [connectedAccount] = useGlobalState('connectedAccount');
    const [amount,setAmount] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!connectedAccount) {
            toast.error("Please connect your wallet first.");
            return;
        }

        if(!amount) return 

        try {
            await backProject(project?.id,amount);
            toast.success('Campaign backed successfully, Might take a while !');
            onClose();
        } catch (error) {
            console.error("Error backing campaign:", error);
            toast.error(error.message || 'Transaction cancelled');
        }
    }

    const onClose =() =>{
        setGlobalState('backModal','scale-0');
        reset();
    }

    const reset = () => {
        setAmount('');
    }

    return(
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300 ${backModal}`}>
            <div className="bg-white opacity-100 shadow-xl shadow-black rounded-xl w-11/12 h-7/12 p-6 md:w-2/5 border-black">
                <form onSubmit={handleSubmit} className="flex flex-col">

                    <div className="flex justify-between items-center">
                        <p className="font-semibold">{project?.title}</p>
                        <button type="button" className="border-0 bg-transparent focus:out" onClick={onClose}> <FaTimes/></button>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="h-20 w-20 rounded-xl overflow-hidden">
                            <img src={project?.imageURL || "https://imgs.search.brave.com/Ue0wl6zSG24q7KCpPaQwA2PRNnJ12HII_X59piM30vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmJyYy5nb3YvdXNl/cmZpbGVzL2ZpbGVz/L1ByZXNzJTIwS2l0/L0NhdGFseXN0JTIw/UHJvZ3JhbSUyME9u/ZSUyMFBhZ2VyLmpw/Zw"}
                            alt={project?.title} 
                            className="h-full w-full object-cover cursor-pointer"></img>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="number" step={0.01} min={0.01} name="amount" placeholder="Amount (ETH)" value={amount} onChange={(e)=> setAmount(e.target.value)} required></input>
                        </div>

                        <div className="space-x-2 flex justify-center items-center w-full"><button type="submit" className="py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md border border-black mt-4 bg-black text-white">Back Campaign</button>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    )

}

export default BackCampaign;