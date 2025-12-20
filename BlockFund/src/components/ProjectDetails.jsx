import React from "react";
import Identiicons from 'react-identicons';
import {FaEthereum} from 'react-icons/fa';
import { setGlobalState, truncate, daysRemaining } from "../store";

const ProjectDetails= ({project}) =>{
    const expired = new Date().getTime() > project?.expiresAt;
    const progress = project && parseFloat(project.cost) > 0 ? (parseFloat(project.raised) / parseFloat(project.cost)) * 100 : 0;

    return(
        <div className="py-24 px-6">
            <div>
                <div className="flex justify-start items-start sm:space-x-4 flex-wrap">
                    {project?.imageURL ? (
                        <img src={project.imageURL} 
                        alt={project.title} 
                        className="rounded-xl h-64 w-full object-cover sm:w-1/3"></img>
                    ) : (
                        <div className="rounded-xl h-64 w-full bg-gray-200 animate-pulse sm:w-1/3"></div>
                    )}

                    <div className="flex-1 sm:py-0 py-4">
                        <div className="flex flex-col justify-start flex-wrap">
                            <h5 className="text-gray-900 text-sm font-medium mb-2">{project?.title}</h5>
                            <small className="text-gray-900">
                                {expired ? `Expired on: ${project?.date}` : `${daysRemaining(project?.expiresAt / 1000)} left`}
                            </small>
                        </div>

                        <div className="font-bold flex justify-between items center w-full">
                            <small className={expired ? 'text-red-500' : 'text-green-500'}>
                                {expired ? 'Campaign Closed' : 'Campaign Open'}
                            </small>
                        </div>

                        <div className="flex justify-between items-center w-full">
                            <div className="flex justify-start space-x-2 mt-3">
                                <Identiicons className="rounded-full shadow-md" size={15} string={project?.owner}></Identiicons>
                                <small className="text-gray-700">{project?.owner ? truncate(project.owner, 4, 4, 11) : '0x...'}</small>
                                <small className="text-gray-700 font-bold">{project?.backers || 0} Backers</small>
                            </div>
                        </div>
                    </div>
                </div>
                <p className="font-light text-sm">{project?.description}</p>
                <div className="w-full bg-gray-300 rounded-full h-1 mt-2">
                    <div className="bg-green-600 h-1 rounded-full" style={{width: `${progress > 100 ? 100 : progress}%`}}></div>
                </div>

                <div className="flex justify-between items-center font-bold mt-2">
                    <div className="flex flex-col">
                        <small>{project?.raised || 0} ETH Raised</small>
                    </div>
                    <small className="flex items-center justify-start">
                        <FaEthereum/>
                        <span>Goal: {project?.cost || 0} ETH</span>
                    </small>
                </div>

                <div className="flex justify-start items-center mt-4 space-x-3">
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-green-700" onClick={()=>setGlobalState('backModal','scale-100')}>Back Campaign</button>
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-gray-500" onClick={()=>setGlobalState('editModal','scale-100')}>Edit</button>
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-red-600" onClick={()=>setGlobalState('deleteModal','scale-100')}>Delete Campaign</button>
                    <button type="button" className="bg-black text-white py-2 px-3.5 font-medium text-xs rounded-full leading-tight uppercase shadow-md hover:bg-orange-600">Payout</button>
                </div>
            </div>
        </div>

    )
}

export default ProjectDetails;