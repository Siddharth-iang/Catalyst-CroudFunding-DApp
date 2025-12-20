import React from "react";
import {FaTimes} from 'react-icons/fa';
import { useGlobalState,setGlobalState } from "../store";

const EditCampaign = () =>{
    const [editModal] = useGlobalState('editModal');
    return(
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300 ${editModal}`}>
            <div className="bg-white opacity-100 shadow-xl shadow-black rounded-xl w-11/12 h-7/12 p-6 md:w-2/5 border-black">
                <form className="flex flex-col">

                    <div className="flex justify-between items-center">
                        <p className="font-semibold">#Add Campaign</p>
                        <button type="button" className="border-0 bg-transparent focus:out" onClick={()=>setGlobalState('editModal','scale-0')}> <FaTimes/></button>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="h-20 w-20 rounded-xl overflow-hidden">
                            <img src="https://imgs.search.brave.com/Ue0wl6zSG24q7KCpPaQwA2PRNnJ12HII_X59piM30vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmJyYy5nb3YvdXNl/cmZpbGVzL2ZpbGVz/L1ByZXNzJTIwS2l0/L0NhdGFseXN0JTIw/UHJvZ3JhbSUyME9u/ZSUyMFBhZ2VyLmpw/Zw" 
                            alt="Project image" 
                            className="h-full w-full object-cover cursor-pointer"></img>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="Title" placeholder="Title" required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="number" step={0.01} min={0.01} name="amount" placeholder="Amount (ETH)" required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="date" name="date" placeholder="dd-mm-yy" required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="image" placeholder="Enter image URL" required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <textarea className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="description" placeholder="Enter the Description" required></textarea>
                        </div>

                        <div className="space-x-2 flex justify-center items-center w-full">
                        <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-green-500 mt-4">Edit Campaign</button>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    )

}

export default EditCampaign;