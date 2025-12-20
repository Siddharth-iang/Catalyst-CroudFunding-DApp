import Header from "./components/Header";
import { Route,Routes} from "react-router-dom";
import Home from "./views/Home";
import Project from "./views/Project";
import ProjectBacker from "./components/ProjectBackers";
import { useEffect } from "react";
import { isWalletConnected, loadProjects } from "./services/Blockchain";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  useEffect(() => {
    const loadBlockchain = async () => {
      await isWalletConnected();
      await loadProjects();
      console.log('Blockchain Loaded');
    };
    loadBlockchain();
  },[]);
  
  return (
        <div>
            <Header/>
            <Routes>
              <Route path="/" element={<Home/>}></Route>
              <Route path="/projects/:id" element={<Project/>}></Route>
            </Routes>

            <ToastContainer
             position="bottom-center"
             autoClose={5000}
             hideProgressBar={false}
             newestOnTop={false}
             closeOnClick
             rtl={false}
             pauseOnFocusLoss
             draggable
             pauseOnHover
             theme="dark"
             />
          </div>
  )
}

export default App
