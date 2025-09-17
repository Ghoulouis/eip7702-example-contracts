import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploy: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, getNamedAccounts, getChainId } = hre;
  const { deploy, get } = deployments;
  const { deployer, agent } = await getNamedAccounts();

  let test = await get("TEST");

  await deploy("Vault", {
    contract: "Vault",
    from: deployer,
    proxy: {
      owner: deployer,
      execute: {
        init: {
          methodName: "initialize",
          args: [test.address],
        },
      },
    },
    log: true,
    skipIfAlreadyDeployed: true,
    autoMine: true,
  });
};
deploy.tags = ["vault"];

export default deploy;
