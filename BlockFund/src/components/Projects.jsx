import React from "react";
import { Link } from 'react-router-dom';
import Identiicons from 'react-identicons';
import { daysRemaining } from "../store";
import { FaEthereum } from "react-icons/fa";

const Projects = ({projects}) =>{
    return(
        <div className="flex flex-col px-6">
            <div className="flex justify-center items-center flex-wrap gap-5">
                {projects.map((project) => (<ProjectCard key={project.id} project={project} />))}
            </div>
        </div>
    )
}

const ProjectCard = ({ project }) => {
    const expired = new Date().getTime() > project?.expiresAt;

    const getProgress = () => {
        const raised = parseFloat(project.raised);
        const cost = parseFloat(project.cost);
        const progress = (raised / cost) * 100;
        return progress > 100 ? 100 : progress;
    }

    return (
    <div className="rounded-lg shadow-lg bg-white w-64 m-4 p-4">
        <Link to={'/projects/' + project.id}>
           <img src={project.imageURL} 
           alt={project.title}
           className="rounded-xl h-64 w-full object-cover"></img>

           <div className="p-4">
             <h5 className="text-lg font-bold">{project.title}</h5>

             <div className="flex flex-col">
                <div className="flex justify-between items-center mb-3">
                    <Identiicons className="rounded-full shadow-md" size={15} string={project.owner}></Identiicons>
                    <small className="text-gray-700">{project.owner ? `${project.owner.slice(0, 5)}...${project.owner.slice(-4)}` : '0x...'}</small>
                </div>

                <div className="flex items-center justify-between">
                    <small className="text-gray-500">{expired ? 'Expired' : 'Open'}</small>
                    <small className="text-gray-500">{expired ? 'Expired' : `${daysRemaining(project.expiresAt / 1000)} left`}</small>
                </div>
             </div>

            <div className="w-full bg-gray-300 rounded-full h-1 mt-2">
                <div className="bg-green-600 h-1 rounded-full" style={{width: `${getProgress()}%`}}></div>
            </div>

            <div className="flex justify-between items-center font-bold mt-1 mb-2 text-gray-700">
                <small>{project.raised} ETH Raised</small>
                <small className="flex items-center gap-1">
                    <FaEthereum/>
                    <span>{project.cost} ETH</span>
                </small>
            </div>

            <div className="flex justify-between items-center flex-wrap mt-4 mb-2">
                <small className="text-gray-500 font-bold">{project.backers} Backers</small>
                <div>{expired ? <small className="text-red-500">Expired</small> : <small className="text-green-500">Open</small>}</div>
            </div>
           </div>
        </Link>
    </div>
)};

export default Projects;