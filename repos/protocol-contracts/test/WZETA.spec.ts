import { AddressZero } from "@ethersproject/constants";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { WZETA2 } from "@typechain-types";
import { expect } from "chai";
import { parseEther } from "ethers/lib/utils";
import { ethers } from "hardhat";

import { FUNGIBLE_MODULE_ADDRESS } from "./test.helpers";
const hre = require("hardhat");

async function deployContract(name, args) {
  const contractFactory = await ethers.getContractFactory(name);
  return await contractFactory.deploy(...args);
}

describe("WZETA tests", () => {
  let WZETAContract: WZETA;

  let owner, owner2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async () => {
    [owner, owner2, ...addrs] = await ethers.getSigners();

    WZETAContract = await deployContract("WZETA2", []);
  });

  describe("WZETA", () => {
    it("deposit", async () => {
      await WZETAContract.connect(owner).deposit({ value: parseEther("1") });
      let b = await WZETAContract.balanceOf(owner.address);
      console.log(b.toString());

      await WZETAContract.approve(owner2.address, parseEther("2"));
      //use owner call
      await WZETAContract.connect(owner).transferFrom(owner.address, owner2.address, parseEther("1"));

      b = await WZETAContract.balanceOf(owner.address);
      console.log("after owner", b.toString());
      b = await WZETAContract.balanceOf(owner2.address);
      console.log("after owner2", b.toString());

      let allow = await WZETAContract.allowance(owner.address, owner2.address);
      console.log("allow", allow.toString());
      console.log("maxuint256", ethers.constants.MaxUint256.toString());
    });
  });
});
