// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Vault is Initializable {
  address public token;

  function initialize(address _token) public initializer {
    token = _token;
  }

  function deposit(uint256 amount) public {
    IERC20(token).transferFrom(msg.sender, address(this), amount);
  }

  function depositEip7702(address to, uint256 amount) public payable {
    IERC20(token).transfer(to, amount);
  }

  receive() external payable {}
}
