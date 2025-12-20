import React from "react";
import { FaEthereum } from "react-icons/fa";
import Identiicons from "react-identicons";

const ProjectBacker = () =>{
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
                        {Array(6).fill().map((item, i) => (
                            <tr key={i} className="bg-white border-b text-gray-900">
                                <td className="py-4 px-6">
                                    <div className="flex justify-start items-center space-x-2">
                                        <Identiicons className="h-10 w-10 rounded-full" string={"0x2e...042" + i} size={25} />
                                        <span>0x2e...042</span>
                                    </div>
                                </td>
                                <td className="py-4 px-6">
                                    <small className="flex justify-start items-center space-x-1">
                                        <FaEthereum />
                                        <span className="text-gray-700 font-medium">3 ETH</span>
                                    </small>
                                </td>
                                <td className="py-4 px-6">false</td>
                                <td className="py-4 px-6">2 days ago</td>
                            </tr>
                        ))}
                    </tbody> 
                 </table> 
             </div>
        </div>
    )
}

export default ProjectBacker;