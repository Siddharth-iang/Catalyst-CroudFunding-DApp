import React from "react";
import Header from "../components/Header";
import Projects from "../components/Projects";
import Hero from '../components/Hero';
import CreateCampaign from "../components/CreateCampaign";
import { useGlobalState } from "../store";

const Home = () =>{
  const[projects] = useGlobalState('projects')
    return(
        <>
          <Hero/>
          <Projects projects={projects}/>
          <CreateCampaign/>
        </>
    )
}

export default Home;