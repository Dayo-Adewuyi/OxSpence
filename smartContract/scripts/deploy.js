//implement ethers from hardhat
const{ethers} = require("hardhat");

async function main(){
     /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so NestcoinContract here is a factory for instances of our Nestcoin contract.
  */
 console.log("deploying 0xSpence contract.......")
 const Ox = await ethers.getContractFactory("OxSpence")
 
 const OxContract = await upgrades.deployProxy(Ox,[])

 console.log(OxContract.address," Ox COntract address")
 console.log(await upgrades.erc1967.getImplementationAddress(OxContract.address)," getImplementationAddress")
 console.log(await upgrades.erc1967.getAdminAddress(OxContract.address)," getAdminAddress")   
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });