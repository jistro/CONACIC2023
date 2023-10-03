// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "forge-std/Script.sol";
import {GuessBook} from "../src/GuessBook.sol";

contract GuessBookScript is Script {
  function setUp() public {}

  function run() public {
    vm.startBroadcast();
    GuessBook guessBook = new GuessBook();
    console.log("GuessBook Contract deployed to %s", address(guessBook));
    vm.stopBroadcast();
  }
}
