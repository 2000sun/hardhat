const hre = require("hardhat");

async function main() {
  const contractFactory = await ethers.getContractFactory("user");
  const user = await contractFactory.deploy();
  await user.deployed();
  console.log("배포된 스마트컨트랙트 주소", user.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

// 0x2b88afcd2350C9BD1580942407ABf6eb8fA04a2C
