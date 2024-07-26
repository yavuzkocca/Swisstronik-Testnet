// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    int public count;

    function setCount(int _count) external {
        count = _count;
    }

    function increment() external {
        count += 1;
    }

    function decrement() external {
        count -= 1;
    }
}
