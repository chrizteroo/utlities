import { task } from "hardhat/config";
import { HardhatUserConfig } from "hardhat/types";

task("compile", "Compiles the contracts", async (taskArgs, hre) => {
  await hre.run("compile");
});

// Hardhat configuration
const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};

export default config;
