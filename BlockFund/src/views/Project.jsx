import React, { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import EditCampaign from "../components/EditCampaign";
import BackCampaign from "../components/BackCampaign";
import DeleteCampaign from "../components/DeleteCampaign";
import { getBackers, loadProject } from "../services/Blockchain";
import {useParams} from 'react-router-dom';
import { useGlobalState } from "../store";
 
const Project= () =>{
    const {id} = useParams();
    const [project] = useGlobalState('project');
    const [backers] = useGlobalState('backers');
    
    useEffect(() => {
        (async () => {
            await loadProject(id);
            await getBackers(id);
        })();
    },[id])
    return(
        <>
           <ProjectDetails project={project}/>
           <EditCampaign project={project}/>
           <BackCampaign project={project}/>
           <DeleteCampaign project={project}/>
        </>
    )
}

export default Project;