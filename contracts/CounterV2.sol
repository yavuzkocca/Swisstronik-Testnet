// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter2 {
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

    function reset() external {
        count = 0;
    }

    function incrementBy(int _value) external {
        count += _value;
    }

    function decrementBy(int _value) external {
        count -= _value;
    }
}
