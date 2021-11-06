// let balance = 500.00;

class Account {
  constructor(userName) {
    this.userName = userName;
    this.transaction = [];
  }
  get balance(){
    let balance = this.transaction.reduce((acc, curr) => acc + curr.value, 0);
    return balance;
  }

  addTransaction(transaction){
    this.transaction.push(transaction);
  }
}

class Transaction {
  constructor(amount, account){
    this.amount = amount;
    this.account = account;
  }

  commit() {
    if(!this.isAllowed()){
      return false
    }
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
   }
}

class Withdrawal extends Transaction {
  isAllowed() {
    if(this.account.balance - this.amount < 0){
      return false;
    }
      return true;
  }
  get value(){
     return -this.amount;
  }
}

class Deposite extends Transaction{
  isAllowed(){
    if(this.amount < 0) {
      return false;
    }
    return true;
  }
  get value(){
   return this.amount;
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account('snow-patrol');
t3 = new Deposite(120, myAccount);
t3.commit();
// console.log('Transaction 3:', t3);
t1 = new Withdrawal(50.25, myAccount);
t1.commit();
// console.log('Transaction 1:', t1);

t2 = new Withdrawal(9.99, myAccount);
t2.commit();
// console.log('Transaction 2:', t2);

t4 = new Withdrawal(59.76, myAccount);
t4.commit();

t7 = new Withdrawal(5.76, myAccount);
t7.commit();
console.log(t7.commit());
t5 = new Deposite(2, myAccount);
t5.commit();


t6 = new Deposite(-2.2, myAccount);
t6.commit();
console.log(t6.commit());
console.log('Balance:', myAccount.balance);
