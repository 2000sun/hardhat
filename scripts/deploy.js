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

// 0xCeff7e47A006dfe685EbF4614434E37b04d3AcEB
