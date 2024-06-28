// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

// Import OpenZeppelin's ERC721 implementation
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

// Contract that represents a collectible item
contract ScmToken is ERC721, Ownable, ERC721Enumerable/*,ERC721Pausable, ERC721Burnable*/ {
     // ===== Property Variables ===== //

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 1 wei;
    //uint public MAX_SUPPLY = 100; // Open Limit

    // ===== Lifecycle Methods ===== //
    constructor(address initialOwner) ERC721("ScmToken", "SCMT") Ownable(initialOwner) {}        

    function withdraw() public onlyOwner() {
        require(address(this).balance > 0, "Balance is zero");
        payable(owner()).transfer(address(this).balance);
    }


    // ===== Minting Functions ===== //
    function safeMint(address to) public payable returns (uint256) {
        // // Check that totalSupply is less than MAX_SUPPLY
        //require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");

        // Check if ether value is correct
        require(msg.value >= MINT_PRICE, "Not enough ether sent.");

        // create a UUID (lazyily)
        uint256 ctr = _tokenIdCounter.current();
        uint256 hash = uint256(keccak256(abi.encodePacked(ctr)));
        _safeMint(to, hash);
        _tokenIdCounter.increment();

        return hash;
    }

    // ===== Other Functions ===== //
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://ScmToken/";
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable/*, ERC721Pausable*/)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

/* NOTES:

    contract address: 0xd9145CCE52D386f254917e481eB44e9943F39138
    mint price: 50000000000000000 wei == 0.05 ether

    // Users

    owner: 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4
        - deployed contract
        - can only call the `onlyOwner` modifier functions

    address 2: 0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2
        - mint 1 NFT

    address 3: 0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db
        - address 2 will transfer NFT #1 to address 3 (recipient)

*/