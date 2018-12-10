pragma solidity ^0.4.24;

import "./IERC20.sol";
import "./SafeMath.sol";

contract Crowdsale {
    using SafeMath for uint256;

    uint256 private cap; // maximum amount of ether to be raised
    uint256 private weiRaised; // current amount of wei raised

    uint256 private rate; // price in wei per smallest unit of token (e.g. 1 wei = 10 smallet unit of a token)
    address private wallet; // wallet to hold the ethers
    IERC20 private token; // address of erc20 tokens

   /**
    * Event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
    event TokensPurchased(
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    // -----------------------------------------
    // Public functions (DO NOT change the interface!)
    // -----------------------------------------
   /**
    * @param _rate Number of token units a buyer gets per wei
    * @dev The rate is the conversion between wei and the smallest and indivisible token unit.
    * @param _wallet Address where collected funds will be forwarded to
    * @param _token Address of the token being sold
    */
    constructor(uint256 _rate, address _wallet, IERC20 _token) public {
        rate = _rate;
        wallet = _wallet;
        token = _token;
        // Instantiate to a default cap of wei
        cap = 80;
    }

    /**
    * @dev Fallback function for users to send ether directly to contract address
    */
    function() external payable {
        buyTokens(msg.sender);
    }

    function buyTokens(address beneficiary) public payable {
        address purchaser = msg.sender;
        uint256 value = msg.value;
        // Calculate number of tokens
        uint256 amount = msg.value.mul(rate);
        
        // Validate that we have not yet reached to token cap
        // and that we will not exceed the token cap with
        // this purchase
        require(!capReached(), "The maximum amount of wei has already been raised");
        require(!weiLimitExceeded(weiRaised.add(value)), "The maximum allowable amount of wei raised will be exceeded with this token purchase");
        
        // Update any states
        weiRaised = weiRaised.add(value);
        
        
        // Forward funds to wallet
        wallet.transfer(value);
        
        // Transfer tokens and emit event
        token.transfer(beneficiary, amount);
        emit TokensPurchased(purchaser, beneficiary, value, amount);
    }

    /**
    * @dev Checks whether the cap has been reached.
    * @return Whether the cap was reached
    */
    function capReached() public view returns (bool) {
       return weiLimitReached(cap);
    }

    // -----------------------------------------
    // Internal functions (you can write any other internal helper functions here)
    // -----------------------------------------

    /**
    * @dev Checks whether the wei raised has reached a defined limit
    * @return a boolean indicating whether or not the wei limit is greater than
    * or equal to the wei raised
    */
    function weiLimitReached(uint256 weiLimit) private view returns (bool) {
        return weiRaised >= weiLimit;
    }
    
     /**
    * @dev Checks whether the wei raised has exceeded a defined limit
    * @return a boolean indicating whether or not the wei limit is greater than
    * the wei raised
    */
    function weiLimitExceeded(uint256 weiLimit) private view returns (bool) {
        return weiRaised > weiLimit;
    }


}

