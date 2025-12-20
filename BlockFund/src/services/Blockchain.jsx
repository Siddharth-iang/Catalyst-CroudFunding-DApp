import abi from "../abis/src/contracts/Catalyst.sol/Catalyst.json"
import address from "../abis/contractAddress.json";
import { getGlobalState,setGlobalState } from "../store";
import {ethers} from 'ethers';

const {ethereum} = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

const connectWallet = async() =>{
    try{
        if(!ethereum) return alert("Please install Metamask!");
        const accounts = await ethereum.request({method:"eth_requestAccounts"});
        setGlobalState('connectedAccount',accounts[0]?.toLowerCase());
        await switchNetwork();
    } catch(error){
        reportError(error);
    }
}

const isWalletConnected = async() =>{
    try{
        if(!ethereum) return alert("Please install Metamask!");
        const accounts = await ethereum.request({method:"eth_requestAccounts"});
        setGlobalState('connectedAccount',accounts[0]?.toLowerCase());

        window.ethereum.on('chainChanged', (chainId) =>{
            window.location.reload();
        });

        window.ethereum.on('accountsChanged',async(newAccounts)=>{
            setGlobalState('connectedAccount',newAccounts[0]?.toLowerCase());
            window.location.reload();
        })

        if(accounts.length){
            setGlobalState('connectedAccount',accounts[0]?.toLowerCase());
            await switchNetwork();
        } else{
            alert('Please connect wallet.');
            console.log('No accounts found.');
        }
    } catch(error){
        reportError(error);
    }
}

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState('connectedAccount');

  if (connectedAccount) {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    const provider = new ethers.providers.JsonRpcProvider('http://127.0.0.1:8545');
    const contract = new ethers.Contract(contractAddress, contractAbi, provider);
    return contract;
  }
};

const createProject = async({
    title,
    description,
    imageURL,
    cost,
    expiresAt,
}) =>{
    try{
        if(!ethereum) return alert("Please install Metamask");

        const contract = await getEthereumContract();
        cost = ethers.utils.parseEther(cost);
        const tx = await contract.createProject(title,description,imageURL,cost,expiresAt);
        await tx.wait();

        await loadProjects();
    } catch(error){
        reportError(error);
    }
}

const loadProjects = async () => {
    try {
        if (!ethereum) return console.log("Please install Metamask");

        const contract = await getEthereumContract();
        const projects = await contract.getProjects();
        const stats = await contract.stats();
        setGlobalState('stats',structureStats(stats));
        setGlobalState('projects',structuredProjects(projects));
        
    } catch (error) {
        if (error.code === 'CALL_EXCEPTION') {
            console.warn("Smart Contract not found at the specified address. Ensure you have deployed the contract and are on the correct network.");
        } else {
            console.error("Error loading projects:", error);
        }
    }
}

const loadProject = async(id) =>{
  try{
    if(!ethereum) return alert('Please install Metamask !');
    const contract = await getEthereumContract();
    const project = await contract.getProject(Number(id));

    setGlobalState('project',structuredProjects([project])[0]);
  } catch(error){
    alert(JSON.stringify(error.message))
    reportError(error);
  }
}

const switchNetwork = async () => {
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x7A69' }], 
    });
  } catch (error) {
    if (error.code === 4902) {
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x7A69',
              chainName: 'Hardhat Localhost',
              rpcUrls: ['http://127.0.0.1:8545'],
              nativeCurrency: {
                name: 'Ether',
                symbol: 'ETH',
                decimals: 18,
              },
            },
          ],
        });
      } catch (addError) {
        console.error(addError);
      }
    }
    console.error(error);
  }
};

const structuredProjects = (projects) =>
  projects
    .map((project) => ({
      id: project.id.toNumber(),
      owner: project.owner,
      title: project.title,
      description: project.description,
      timestamp: project.timestamp.toNumber() * 1000,
      expiresAt: project.expiresAt.toNumber() * 1000,
      date: toDate(project.expiresAt.toNumber() * 1000),
      imageURL: project.imageURL,
      raised: ethers.utils.formatEther(project.raised),
      cost: ethers.utils.formatEther(project.cost),
      backers: project.backers ? project.backers.toNumber() : 0,
      status: project.status || 0,
    }))
    .reverse();

    const toDate = (timestamp) => {
        const date = new Date(timestamp);
        const dd = date.getDate() >9? date.getDate() : `0${date.getDate()}`
        const mm = date.getMonth() + 1 > 9? date.getMonth() + 1 : `0${date.getMonth() +1}`
        const yyyy = date.getFullYear()
        return `${yyyy}-${mm}-${dd}`
    }

const structureStats = (stats) => ({
  totalProjects: (stats.totalProjects || stats[0])?.toNumber() || 0,
  totalBacking: (stats.totalBacking || stats[1])?.toNumber() || 0,
  totalDonations: ethers.utils.formatEther(stats.totalDonations || stats[2] || 0),
});

const truncate = (text, startChars, endChars, maxLength) => {
    if (text.length > maxLength) {
      let start = text.substring(0, startChars)
      let end = text.substring(text.length - endChars, text.length)
      while (start.length + end.length < maxLength) {
        start = start + '.'
      }
      return start + end
    }
    return text
}

const reportError = (error) =>{
    console.error("Blockchain Service Error:", error);
    let message = error.message || 'An error occurred.';
    
    if (error.code === 'CALL_EXCEPTION' && error.reason) {
      message = error.reason;
    } else if (error.code === 'CALL_EXCEPTION') {
      message = 'Smart Contract not found. Please check your network and contract address.';
    } else if (error.data?.message) {
      message = error.data.message;
    }
  
    if (message.startsWith('execution reverted: ')) {
      message = message.substring('execution reverted: '.length);
    }
    throw new Error(message);
}

export { connectWallet, isWalletConnected, createProject, loadProjects,switchNetwork, truncate,loadProject}