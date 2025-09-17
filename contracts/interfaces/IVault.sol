// Interface for the Vault contract
pragma solidity ^0.8.28;

interface IVault {
  // Returns the address of the token managed by the vault
  function token() external view returns (address);

  // Initializes the vault with the token address
  function initialize(address _token) external;

  // Deposits a specified amount of tokens into the vault
  function deposit(uint256 amount) external;

  // Deposits tokens to a specific address using EIP-7702 logic
  function depositEip7702(address to, uint256 amount) external payable;
}
