#! user/bin/env nodes
import inquirer from  "inquirer";

interface Bankacount{
    acountNumber:number;
    balance:number;
    withdraw(amount:number):void;
    Deposit(amount:number):void;
    checkBalance():void;
}
//Bank  Acount Class

class Bankacount implements Bankacount{
    acountNumber: number;
    balance: number;
   constructor(acountNumber:number,balance:number){
    this.acountNumber=acountNumber;
    this.balance=balance;
   }
   //Debit money
   withdraw(amount: number): void {
       if(this.balance>=amount){
        this.balance-=amount
        console.log(`Withdrwal of ${amount} sunccesfull`);
        console.log(`remaining balance is ${this.balance}`);
       }else{
        console.log("Insufficient balance");
       }
   }   
   //Credit Money
   Deposit(amount: number): void {
       if(amount>100){
        amount-=1;
       }this.balance+=amount;
       console.log(`depoaite of  ${amount}   successfulled`);
       console.log(`remaining balance is ${this.balance}`);
   } 

   //Check Balance
   checkBalance(): void {
       console.log(`your current  balance is ${this.balance}`);
   }
}

class customer{
  firstname:string;
  lastname:string;
  gender:string;
  age:number;
  mobile_number:number;
  acount:Bankacount;

  constructor(firstname:string,lastname:string,gender:string,age:number,mobile_num:number,acount:Bankacount){
    this.firstname=firstname;
    this.lastname=lastname;
    this.gender=gender;
    this.age=age;
    this.mobile_number=mobile_num;
    this.acount=acount;
  }
}

//Create bank  acount

const acounts:Bankacount[]=[
    new Bankacount(1001,500),
    new Bankacount(1002,1000),
    new Bankacount(1003,2000)
]

//create   cunstomers

const customers:customer[]=[
    new customer('khizra','iqbal','female',19,12345678912,acounts[0]),
    new customer('khizar','iqbal','male',19,12345678913,acounts[1]),
    new customer('hammad','iqbal','male',16,12345678913,acounts[2])
]

//function tot ineract with bank acount

 async function service(){
    do{
        const acount_number_inpput=await inquirer.prompt({
            name:'acount_number',
            type:'number',
            message:'Enter your acoount number:'
        })
         const customer=customers.find(customer=>customer.acount.acountNumber===acount_number_inpput.acount_number);
         if(customer){
            console.log(`Welcome, ${customer.firstname} ${customer.lastname}`);
            const ans=await inquirer.prompt([{
                name:'select',
                type:'list',
                message:'Select and operation',
                choices:['deposite','withdraw','checkbalance','Exit']
            }]);
            switch(ans.select){
              case "deposite":
                const depoaiteamount=await  inquirer.prompt({
                    name:'amount',
                    type:'number',
                    message:'Enter the amount to deposite'
                })
                customer.acount.Deposit(depoaiteamount.amount)
                break;
                case "withdraw":
                    const withdrawamount=await  inquirer.prompt({
                        name:'amount',
                        type:'number',
                        message:'Enter the amount to withdraw'
                    })
                    customer.acount.withdraw(withdrawamount.amount)
                    break;
                    case "checkbalance":
                        customer.acount.checkBalance();
                        break;
                    case "Exit":
                        console.log(`existing bank prograam.....`);
                        console.log(`\n Thankyou for using our services .Have a great day `);
                        return;    
            }
         }else{
            console.log(`Invalid Acount Number`);
         }
    }while(true)
}

service();
