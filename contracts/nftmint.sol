//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract nftmint is ERC721{
    address public owner;
    struct occasion{
        uint256 id;
        string name;
        uint256 cost;
        uint256 tickets;
        uint256 maxtickets;
        string date;
        string time;
        string location;
    }
    uint256 public totalsupply;
    uint256 public maxoccasion=0;
    mapping(uint256=>occasion) occasions;
    constructor(string memory _name,string memory _symbol) ERC721(_name,_symbol){
        owner = msg.sender;


    }
    function mint(uint256 _id) public payable{
        occasions[_id].maxtickets-=1;
        totalsupply++;
        _safeMint(msg.sender,totalsupply);
    }
    function list(string memory _name,uint256 _cost,uint256 _tickets,uint256 _maxtickets,string memory _date,string memory _time,string memory  _location) public {
        require(msg.sender==owner);
        maxoccasion++;
        occasions[maxoccasion]=occasion(
            maxoccasion,
            _name,
            _cost,
            _tickets,
            _maxtickets,
            _date,
            _time,
            _location

        );

    }
    function printnew(uint256 _id) public view returns(occasion memory){
        return occasions[_id];
    }
    function withdraw() public{
        require(msg.sender==owner);
        (bool success,)=owner.call{value:address(this).balance}("");
    }

}