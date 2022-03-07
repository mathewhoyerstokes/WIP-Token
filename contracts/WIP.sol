// SPDX-License-Identifier: MIT
pragma solidity ^0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";


contract WIP is ERC20, ERC20Burnable, Pausable, Ownable, ERC20Permit, ERC20Votes {
    
    uint public postThreshold;
    uint public commentThreshold;
    
    constructor() ERC20("WIP", "WIP") ERC20Permit("WIP") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
        postThreshold = 100 * 10 ** decimals();
        commentThreshold = 25 * 10 ** decimals();
    }

    function changePostThreshold (uint newThreshold) public onlyOwner {
      postThreshold = newThreshold * 10 ** decimals();
    }

    function changeCommentThreshold (uint newThreshold) public onlyOwner {
      commentThreshold = newThreshold * 10 ** decimals();
    }

    function canPost (address from) public view returns (bool) {
      return balanceOf(from) >= postThreshold;
    }

    function canComment (address from) public view returns (bool) {
      return balanceOf(from) >= commentThreshold;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(address from, address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._afterTokenTransfer(from, to, amount);
    }

    function _mint(address to, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._mint(to, amount);
    }

    function _burn(address account, uint256 amount)
        internal
        override(ERC20, ERC20Votes)
    {
        super._burn(account, amount);
    }
}

