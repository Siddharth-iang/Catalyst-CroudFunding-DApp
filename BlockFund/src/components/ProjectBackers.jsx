import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identiicons from "react-identicons";
import { truncate } from "../store";
import Moment from 'react-moment';

const ProjectBacker = ({backers}) =>{
    return(
        <div className="flex flex-col justify-center items-center w-full px-6 mb-64">
            <div className="max-h-[calc(100vh-20rem)] overflow-y-auto shadow-md rounded-md w-full">
                <table className="min-w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="py-3 px-6">Backer</th>
                            <th scope="col" className="py-3 px-6">Donation</th>
                            <th scope="col" className="py-3 px-6">Refunded</th>
                            <th scope="col" className="py-3 px-6">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {backers.map((backer, i) => (
                            <Backer key={i} backer={backer}/>
                        ))}
                    </tbody> 
                 </table> 
             </div>
        </div>
    )
}

const Backer = ({backer}) =>(
    <tr className="bg-white border-b text-gray-900">
        <td className="py-4 px-6">
            <div className="flex justify-start items-center space-x-2">
                <Identiicons className="h-10 w-10 rounded-full" string={backer?.owner} size={25} />
                <span>{truncate(backer?.owner,4,4,11)}</span>
            </div>
        </td>
        <td className="py-4 px-6">
            <small className="flex justify-start items-center space-x-1">
                <FaEthereum />
            <span className="text-gray-700 font-medium">{backer.contribution}</span>
            </small>
        </td>
        <td className="py-4 px-6">{backer.refunded ? 'Yes':'No'}</td>
        <td className="py-4 px-6"><Moment fromNow>{backer.timestamp}</Moment></td>
    </tr>
)

export default ProjectBacker;