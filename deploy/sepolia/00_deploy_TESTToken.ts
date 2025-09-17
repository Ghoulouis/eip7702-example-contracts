import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy, get } = deployments;
  const { deployer, agent } = await getNamedAccounts();

  await deploy("TEST", {
    contract: "ERC20Mintable",
    from: deployer,
    args: ["Test Token", "TEST", 6],
    log: true,
    skipIfAlreadyDeployed: true,
    autoMine: true,
  });
};
deploy.tags = ["testToken"];

export default deploy;
