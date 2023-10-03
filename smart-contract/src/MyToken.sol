// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyToken is ERC721, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Tu pasaporte a web3", "PW3") {}

    function _baseURI() internal pure override returns (string memory) {
        return "https://bafkreid7o6iv7igyinkw75paz5bqqjuejkwz6glhpe3krxetsoeh6awdmu.ipfs.nftstorage.link/";
    }

    function safeMint(address to) public returns (uint256) {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        return tokenId;
    }
}
