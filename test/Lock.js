const {expect} = require("chai")

describe("nftmint",()=>{
  describe("deployment",()=>{
    let token,deployer,buyer
    beforeEach(async()=>{
      const cont = await ethers.getContractFactory("nftmint");
       token = await cont.deploy("aadi","TN");
      [deployer,buyer]= await ethers.getSigners();
      const transaction=await token.connect(deployer).list("anirudh concert",1000,10000,20000,"20/10/2023","18:00","chennai");
      await transaction.wait()
      
      const mine = await token.connect(buyer).mint(1,{value:1});
      await mine.wait();
      

    })
  it("sets the name", async()=>{
    
    let name = await token.name();
    expect(name).to.equal("aadi");

  })
  it("sets the symbol", async()=>{

    let symbol = await token.symbol();
    expect(symbol).to.equal("TN");

  })
  it("sets the owner",async()=>{
    let owner = await token.owner();
    expect(owner).to.equal(deployer.address)
  })
  it("store in blocks",async()=>{
    let num = await token.maxoccasion();
    expect(num).to.be.equal(1)

  })
  it("verifies with the given input",async()=>{
    const geu = await token.printnew(1);
    expect(geu.id).to.be.equal(1)
    expect(geu.name).to.be.equal("anirudh concert");
  })
  it("mints the block",async()=>{
    const occasion = await token.printnew(1)
    expect(occasion.maxtickets).to.be.equal(19999);
  })
  it("verified the balance",async()=>{

  })
})

})