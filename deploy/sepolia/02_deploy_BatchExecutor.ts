import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy, get } = deployments;
  const { deployer, agent } = await getNamedAccounts();

  let test = await get("TEST");

  await deploy("BatchExecutor", {
    contract: "BatchExecutor",
    from: deployer,
    log: true,
    autoMine: true,
  });
};
deploy.tags = ["batchExecutor"];

export default deploy;
