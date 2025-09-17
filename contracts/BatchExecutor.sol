// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interfaces/IVault.sol";

contract BatchExecutor {
  struct Call {
    address to;
    uint256 value;
    bytes data;
  }

  function execute(Call[] calldata calls) external payable {
    // This function will be executed in the context of the EOA via EIP-7702 delegation
    // No need for msg.sender check in simple cases, but add if required for security
    for (uint256 i = 0; i < calls.length; i++) {
      (bool success, ) = calls[i].to.call{ value: calls[i].value }(calls[i].data);
      require(success, "Batch call failed");
    }
  }

  function deposit(uint256 amount) external payable {
    address vault = 0x6E33FD6dD5aD776A218e3CB4ddaB6E8868f2eEfD;
    address token = 0xF04C04AF7fF76BAf096ddB18B3Cd453a7B2fEf04;
    IERC20(token).approve(vault, amount);
    IVault(vault).deposit(amount);
  }
  receive() external payable {}
}
