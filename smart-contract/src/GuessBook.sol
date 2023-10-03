// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";

contract GuessBook {
    using Counters for Counters.Counter;

    Counters.Counter private _userIdCounter;

    struct Message {
        string img;
        string message;
        address sender;
    }

    mapping(uint256 => Message) private _messages;

    function postMessage(string memory img, string memory message) public returns (uint256) {
        uint256 userId = _userIdCounter.current();
        _userIdCounter.increment();
        _messages[userId] = Message(img, message, msg.sender);
        return userId;
    }

    function getMessage(uint256 userId) public view returns (Message memory) {
        return _messages[userId];
    }

    function getCount() public view returns (uint256) {
        return _userIdCounter.current();
    }
}