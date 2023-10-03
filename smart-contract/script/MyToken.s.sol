// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import {MyToken} from "../src/MyToken.sol";
import {GuessBook} from "../src/GuessBook.sol";

contract MyTokenScript is Script {
  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    MyToken instance = new MyToken();
    console.log("Token Contract deployed to %s", address(instance));
    GuessBook guessBook = new GuessBook();
    console.log("GuessBook Contract deployed to %s", address(guessBook));
    vm.stopBroadcast();
  }
}
