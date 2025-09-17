// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;
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

  receive() external payable {}
}
