import React from "react";
import {FaTimes} from 'react-icons/fa';
import { useGlobalState, setGlobalState } from "../store";
import { useState  } from "react";
import { createProject } from "../services/Blockchain";
import {toast} from 'react-toastify';

const CreateCampaign = () =>{
    const [createModal] = useGlobalState('createModal');
    const [connectedAccount] = useGlobalState('connectedAccount');
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [cost,setCost] = useState("");
    const [date,setDate] = useState("");
    const [imageURL,setImageURL] = useState("");

    const toTimeStamp = (dateStr) =>{
        const dateObj = Date.parse(dateStr);
        return dateObj/1000;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!connectedAccount) {
            toast.error("Please connect your wallet first.");
            return;
        }

        if(!title || !description || !cost ||!date || !imageURL) return 

        const params = {
            title,
            description,
            cost,
            expiresAt:toTimeStamp(date),
            imageURL,
        }
        try {
            await createProject(params);
            toast.success('Campaign created successfully, Might take a while !');
            onClose()
        } catch (error) {
            console.error("Error creating campaign:", error);
            toast.error(error.message || 'Transaction cancelled');
        }
    }

    const onClose =() =>{
        setGlobalState('createModal','scale-0');
        reset();
    }

    const reset = () =>{
        setTitle('');
        setDescription('');
        setCost('');
        setImageURL('');
        setDate('');
    }

     
    return(
        <div className={`fixed top-0 left-0 w-screen h-screen flex items-center justify-center transform transition-transform duration-300 ${createModal}`}>
            <div className="bg-white opacity-100 shadow-xl shadow-black rounded-xl w-11/12 h-7/12 p-6 md:w-2/5 border-black">
                <form className="flex flex-col" onSubmit={handleSubmit}>

                    <div className="flex justify-between items-center">
                        <p className="font-semibold">#Add Campaign</p>
                        <button type="button" className="border-0 bg-transparent focus:out" onClick={onClose}> <FaTimes/></button>
                    </div>

                    <div className="flex flex-col justify-center items-center mt-5">
                        <div className="h-20 w-20 rounded-xl overflow-hidden">
                            <img src={imageURL || 'https://imgs.search.brave.com/Ue0wl6zSG24q7KCpPaQwA2PRNnJ12HII_X59piM30vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/bmJyYy5nb3YvdXNl/cmZpbGVzL2ZpbGVz/L1ByZXNzJTIwS2l0/L0NhdGFseXN0JTIw/UHJvZ3JhbSUyME9u/ZSUyMFBhZ2VyLmpw/Zw'} 
                            alt="Project image" 
                            className="h-full w-full object-cover cursor-pointer"></img>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="Title" placeholder="Title" value={title} onChange={(e)=> setTitle(e.target.value)} required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="number" step={0.01} min={0.01} name="amount" placeholder="Amount (ETH)" value={cost} onChange={(e)=> setCost(e.target.value)} required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="date" name="date" placeholder="dd-mm-yy" value={date} onChange={(e)=> setDate(e.target.value)}required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <input className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="image" placeholder="Enter image URL" value={imageURL} onChange={(e)=> setImageURL(e.target.value)}required></input>
                        </div>

                        <div className="flex w-full items-center justify-center mt-3">
                            <textarea className="block w-full justify-center bg-gray-300 rounded-xl border-0" type="text" name="description" placeholder="Enter the Description" value={description} onChange={(e)=> setDescription(e.target.value)}required></textarea>
                        </div>

                        <div className="space-x-2 flex justify-center items-center w-full">
                        <button type="submit" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-green-500 mt-4">Submit Campaign</button>
                        </div> 
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateCampaign;