// https://leetcode.com/problems/simple-bank-system/

// TL;DR:
// Constructor:
//   - Initialize the accounts array with the balances
// Transfer:
//   - Check if both accounts are valid and account1 has enough money and if not, return false
//   - If yes, deduct the money from account1, add it to account2 and return true
// Deposit:
//   - Check if the account is valid and if not, return false
//   - If yes, add the money to the account and return true
// Withdraw:
//   - Check if the account has enough money and if not, return false
//   - If yes, deduct the money from the account and return true
// Create helper functions to check if the account is valid and if the account has enough money

// Complexities:
// Time => O(1)
// Space => O(n), where n is the number of accounts

class Bank {
    private readonly accounts: number[];

    constructor(balance: number[]) {
        this.accounts = balance;
    }

    transfer(account1: number, account2: number, money: number): boolean {
        if (!this._isValidAccount(account2) || !this._hasEnoughMoney(account1, money)) {
            return false;
        }

        this.accounts[account1 - 1] -= money;
        this.accounts[account2 - 1] += money;
        
        return true;
    }

    deposit(account: number, money: number): boolean {
        if (!this._isValidAccount(account)) {
            return false;
        }

        this.accounts[account - 1] += money;
        return true;
    }

    withdraw(account: number, money: number): boolean {
        if (!this._hasEnoughMoney(account, money)) {
            return false;
        }

        this.accounts[account - 1] -= money;
        return true;
    }

    private _isValidAccount(account: number): boolean {
        return account >= 1 && account <= this.accounts.length;
    }

    private _hasEnoughMoney(account: number, money: number): boolean {
        if (!this._isValidAccount(account)) {
            return false;
        }

        return this.accounts[account - 1] >= money;
    }
}