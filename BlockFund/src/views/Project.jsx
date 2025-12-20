import React, { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails";
import ProjectBacker from "../components/ProjectBackers";
import EditCampaign from "../components/EditCampaign";
import BackCampaign from "../components/BackCampaign";
import DeleteCampaign from "../components/DeleteCampaign";
import { loadProject } from "../services/Blockchain";
import {useParams} from 'react-router-dom';
import { useGlobalState } from "../store";
 
const Project= () =>{
    const {id} = useParams();
    const {project} = useGlobalState('project');
    
    useEffect(async () => {
        await loadProject(id);
    },[])
    return(
        <>
           <ProjectDetails/>
           <ProjectBacker/>  
           <EditCampaign/>
           <BackCampaign/>
           <DeleteCampaign/>
        </>
    )
}

export default Project;