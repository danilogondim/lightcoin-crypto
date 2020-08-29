class Account {

  constructor() {
    this.transactions = [];
  }

  get balance() {
    let balance = 0;
    this.transactions.forEach(elem => {
      balance += elem.value;
    });
    return balance;
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

}

class Transaction {

  constructor(amount, account) {
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if (this.isAllowed()) {
      this.time = new Date();
      this.account.addTransaction(this);
    }
  }

}

class Deposit extends Transaction {

  get value() {
    return this.amount;
  }

  isAllowed() {
    return true;
  }

}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }

  isAllowed() {
    if (this.amount <= this.account.balance) {
      return true;
    }
  }

}


// DRIVER CODE BELOW
const myAccount = new Account();

console.log('Starting Balance:', myAccount.balance);

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();


const t3 = new Deposit(70.00, myAccount);
t3.commit();

const t4 = new Withdrawal(700.00, myAccount);
t4.commit();

console.log('Ending Balance:', myAccount.balance);

console.log(myAccount.transactions);



// code before refactoring after seeing lhl answer

// class Account {

//   constructor(username) {
//     this.username = username;
//     this.transactions = [];
//   }
//   get balance() {
//     this._balance = 0;
//     this.transactions.forEach(elem => {
//       elem instanceof Withdrawal ? this._balance -= elem.amount : this._balance += elem.amount;
//     })
//     return this._balance;
//   }

//   addTransaction(transaction) {
//     this.transactions.push(transaction);
//   }
// }

// class Transaction {
//   constructor(amount, account) {
//     this.amount = amount;
//     this.account = account;
//   }
//   commit() {
//     // Keep track of the time of the transaction
//     this.time = new Date();
//     if (this.value) {
//       this.result = "transaction succeed";
//       // Add the transaction to the account
//       this.account.addTransaction(this);
//     } else {
//       this.result = "transaction failed";
//     }
//   }
// }

// class Deposit extends Transaction {

//   get value() {
//     return this.amount;
//   }

// }

// class Withdrawal extends Transaction {

//   get value() {
//     if (this.amount < this.account.balance) {
//       return -this.amount;
//     } else {
//       // console.log("Insufficient funds.");
//       return null;
//     }
//   }

// }
