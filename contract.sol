// pragma solidity ^0.8.7;



  /****************************************|
  |         Ape Project Contract           |
  |_______________________________________*/

contract ApeProject is ERC721URIStorage ,Ownable {

  /****************************************|
  |         Ape Types                      |
  |_______________________________________*/

    uint256 [] Apes;

/*
    xenaApes;
    legendaryApes;
    greatApes;
    genesisApes;
    timepieceApes;
*/

  /****************************************|
  |     Mappings And Variables             |
  |_______________________________________*/



struct Mining{
    uint256 useSilver;
    uint256 useGold;
}
mapping(uint256 => uint256) public apeTypes;
mapping(uint256 => uint256) public lastClaim;
mapping(address => bool) public Governance;
mapping(address => bool) public WhiteListed;
mapping(address => Mining) public MiningEquipment;
  mapping(uint256 => string) private _tokenURIs;

uint256 public RewardTokenPerBlock=0;
uint256 public TOTALSUPPLY=10000;
uint256 public nextMinted=0;
uint256 public mintPrice=0;
uint256 public MiningPrice=0;
address public variableToken=address(0);
bool private hidden=false;
bool private partialSale=false;
bool private preSale=true;
  /****************************************|
  |     Constructor                        |
  |_______________________________________*/


    constructor(uint256 amount) ERC721("TheApeProject","THEAPEPROJECT") public payable {
  for(uint i = 0; i < amount; i++){
        _safeMint(msg.sender,i);
        lastClaim[i]=block.number;
        }
       
        nextMinted=amount;
      
}

  /****************************************|
  |     Mutable Functions                  |
  |_______________________________________*/


function buyMining(uint256 MiningType,uint256 times) public {
  if(MiningType==1){
 require( IERC20(variableToken).balanceOf(msg.sender)>(MiningPrice/2)*times,"Not Enough Variable Token To Buy Equipment");
 IERC20(variableToken).transferFrom(msg.sender,address(this),times*(MiningPrice/2));
 MiningEquipment[msg.sender].useSilver=MiningEquipment[msg.sender].useSilver+times;
  }
  if(MiningType==2){
   require( IERC20(variableToken).balanceOf(msg.sender)>times*MiningPrice,"Not Enough Variable Token To Buy Equipment");
 IERC20(variableToken).transferFrom(msg.sender,address(this),MiningPrice*times);
 MiningEquipment[msg.sender].useGold=MiningEquipment[msg.sender].useGold+times;
  }
}

function mint(uint256 amount) public payable {
    require(nextMinted<TOTALSUPPLY,"All The Apes Have Been Minted");
    require(mintPrice>0,"No Minting Price Has Been Set");
    require(msg.value>mintPrice*amount,"Not Enough ETH To Mint");
    require(amount<=800,"Up To 800 Can Be Minted At Once");
    if(preSale){
    require(WhiteListed[msg.sender]==true,"Only WhiteListed Addresses Can Mint On Presale");
        for (uint i = 0; i < amount; i++) {
        _safeMint(msg.sender,nextMinted);
        apeTypes[nextMinted]=1;
        nextMinted=nextMinted+1;
        lastClaim[nextMinted]=block.number;
      }
    }else{
 for (uint i = 0; i < amount; i++) {
        _safeMint(msg.sender,nextMinted);
        nextMinted=nextMinted+1;
        apeTypes[nextMinted]=1;
        lastClaim[nextMinted]=block.number;
    }
    }
   
 
}
function claim(uint256[] memory owned) public  {
   require(nextMinted==TOTALSUPPLY,"Not All The Apes Have Been Minted");
    require(hidden==false,"Apes Not Revealed Yet");
    uint256 amountToClaim=setClaimAmount(msg.sender,owned);
    require(amountToClaim>0,"Not Variable Token Amount To Claim");
    require(IERC20(variableToken).balanceOf(address(this))>amountToClaim,"Not Enough Variable Token In Contract To Claim");
    IERC20(variableToken).transfer(msg.sender,amountToClaim);

}
function getMiningPrice() public view returns(uint256 _price) {
  _price=MiningPrice;
}
function getMining(uint256 MiningType) public view returns(uint256 uses) {
   if(MiningType==1){
  uses=MiningEquipment[msg.sender].useSilver;
 return uses;
  }
  if(MiningType==2){
  uses=MiningEquipment[msg.sender].useGold;
  return uses;
  }
}
function isHidden() public view returns (bool){
  return hidden;
}
function getVariableToken() public view returns (address){
  return variableToken;
}
function getRewardTokenPerBlock() public view returns (uint256){
    return RewardTokenPerBlock;
}
function getMintPrice() public view returns (uint256){
return mintPrice;
}
function getPreSale() public view returns (bool){
return preSale;
}
function getNextMinted() public view returns (uint256){
return nextMinted;
}
function getClaimAmount(address user,uint256[] memory owned) public view returns (uint256){
  require(hidden==false,"Apes Not Revealed Yet");
  uint256 amount;
    for(uint i = 0; i < owned.length; i++){
    require(ownerOf(owned[i])==user,"User Is Not The Owner");
    if(owned[i]<777){
    amount=amount+(block.number-lastClaim[owned[i]])*3*RewardTokenPerBlock;
    }else{
    amount=amount+(block.number-lastClaim[owned[i]])*apeTypes[owned[i]]*RewardTokenPerBlock;
        }
    }
    
     if(MiningEquipment[msg.sender].useSilver>0){
      amount=amount*3/2;
    }
          if(MiningEquipment[msg.sender].useGold>0){
      amount=amount*5/2;
    }
    return amount;
}
    function getOwned(address user,uint256 lastId) public view returns (uint256){
  require(hidden==false,"Apes Not Revealed Yet");
  for(uint i = lastId; i < TOTALSUPPLY; i++){
      if(ownerOf(i)==user){
        return i;
      }
  }    
      }
function getGovernance(address user) public view returns (bool){
    if(balanceOf(user)>=5){
        return true;
    }else{
        return false;
    }
}
    /**
     * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
     * token will be the concatenation of the `baseURI` and the `tokenId`. Empty
     * by default, can be overriden in child contracts.
     */
    function _baseURI() internal view virtual override returns (string memory) {
        return _originalBaseUri;
    }

  /**
     * @dev See {IERC721Metadata-tokenURI}.
     */
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        if(hidden==true){
            return _baseURI();
        }
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        // If there is no base URI, return the token URI.
        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        // If both are set, concatenate the baseURI and tokenURI (via abi.encodePacked).
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }
}