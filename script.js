'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

// const account1 = {
//     owner: 'Triston Vidrine',
//     movements: [200,450,-400,3000,-650,-130,70,1300],
//     intrestRate: 1.2,
//     pin:1111,
// }
// const account2 = {
//     owner: 'Fabian Bernard',
//     movements: [5000,3400,-150,-790,-3210,-1000,8500,-30],
//     intrestRate: 1.5,
//     pin:2222,
// }
// const account3 = {
//     owner: 'Aaron Halpern',
//     movements: [200,-200,340,-300,-20,50,400,-460],
//     intrestRate: 0.7,
//     pin:3333,
// }
// const account4 = {
//     owner: 'Jacob Castille',
//     movements: [430,1000,700,50,90],
//     intrestRate: 1,
//     pin:4444,
// }
// const account5 = {
//     owner: 'Dustin Vidrine',
//     movements: [2154,32,-500,233,1414,-3000,10000],
//     intrestRate: 1.3,
//     pin:5555,
// }




// const accounts = [account1,account2,account3,account4,account5];



const account1 = {
    owner: 'Triston Vidrine',
    movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
    intrestRate: 1.2, // %
    pin: 1111,
  
    movementsDates: [
      '2021-09-11T21:31:17.178Z',
      '2021-10-12T07:42:02.383Z',
      '2022-10-12T09:15:04.904Z',
      '2022-10-13T10:17:24.185Z',
      '2022-10-14T14:01:59.604Z',
      '2022-10-15T14:10:17.194Z',
      '2022-10-16T23:06:17.929Z',
      '2022-10-18T05:05:10.790Z',
    ],
    currency: 'EUR',
    locale: 'pt-PT', // de-DE
  };



  
  const account2 = {
    owner: 'Aaron Halpern',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
    intrestRate: 1.5,
    pin: 2222,
  
    movementsDates: [
      '2021-11-01T13:15:33.035Z',
      '2021-11-30T09:48:16.867Z',
      '2021-12-25T06:04:23.907Z',
      '2022-01-25T14:18:46.235Z',
      '2022-02-05T16:33:06.386Z',
      '2022-04-10T14:43:26.374Z',
      '2022-06-25T18:49:59.371Z',
      '2022-07-26T12:01:20.894Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  };
  
  const accounts = [account1, account2];
  
const test = new Date(account1.movementsDates.at(-1));

console.log(test.getHours());
  
  // Elements
  const labelWelcome = document.querySelector('.welcome');
  const labelDate = document.querySelector('.date');
  const labelBalance = document.querySelector('.balance__value');
  const labelSumIn = document.querySelector('.summary__value--in');
  const labelSumOut = document.querySelector('.summary__value--out');
  const labelSumInterest = document.querySelector('.summary__value--interest');
  const labelTimer = document.querySelector('.timer');
  
  const containerApp = document.querySelector('.app');
  const containerMovements = document.querySelector('.movements');
  
  const btnLogin = document.querySelector('.login__btn');
  const btnTransfer = document.querySelector('.form__btn--transfer');
  const btnLoan = document.querySelector('.form__btn--loan');
  const btnClose = document.querySelector('.form__btn--close');
  const btnSort = document.querySelector('.btn--sort');
  
  const inputLoginUsername = document.querySelector('.login__input--user');
  const inputLoginPin = document.querySelector('.login__input--pin');
  const inputTransferTo = document.querySelector('.form__input--to');
  const inputTransferAmount = document.querySelector('.form__input--amount');
  const inputLoanAmount = document.querySelector('.form__input--loan-amount');
  const inputCloseUsername = document.querySelector('.form__input--user');
  const inputClosePin = document.querySelector('.form__input--pin');
  
  inputLoginPin.value = '1111'
  inputLoginUsername.value = 'tv'
  
  containerMovements.innerHTML = '';
  //Functions

  //Formats Dates
  const formatDate = function(date){
    const calcDaysPassed = (date1,date2) =>Math.round(Math.abs(date2 - date1)/(1000 * 60 * 60 * 24));
    const daysPassed = calcDaysPassed(new Date(),date)
    const currentdate = new Date(date)
    const year = currentdate.getFullYear()
    const month = `${currentdate.getMonth()+1}`.padStart(2,0)
    const day = `${currentdate.getDate()}`.padStart(2,0)
    const hour = `${currentdate.getHours()}`.padStart(2,0)
    const minute = `${currentdate.getMinutes()}`.padStart(2,0)


    if(daysPassed===0)return`Today at ${+hour>12 ? +hour-12 : +hour==0?+hour+12 : +hour}:${minute}${+hour>=12?"PM":"AM"}`
    if(daysPassed===1)return `YesterDay at ${+hour>12 ? +hour-12 : +hour==0?+hour+12 : +hour}:${minute}${+hour>=12?"PM":"AM"}`
    if(daysPassed<=7)return `${daysPassed} Days Ago at ${+hour>12 ? +hour-12 : +hour==0?+hour+12 : +hour}:${minute}${+hour>=12?"PM":"AM"}`
    else{
        return `${month}/${day}/${year} at ${hour>12 ? hour-12 : hour}:${minute}${hour>=12?"PM":"AM"}`
    }
}

  //1.Adds Movment Elements to the DOM
  const displayMovments = function(accounts,sort = false){
      containerMovements.innerHTML = '';
      const currencyType = accounts.currency ==='EUR'?'€':'$'
      const [movs, dates] = sort? sortMovements(accounts.movements, accounts.movementsDates): [accounts.movements, accounts.movementsDates];
      movs.forEach((movs,i)=>{
          const type = movs>0 ? 'deposit' : 'withdrawal'
          const date = formatDate(new Date(dates[i]));
          const html = 
          `<div class="movements__row">
            <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
            <div class="movements__date">${date}</div>
            <div class="movements__value">${currencyType === "€" ? `${Math.round(movs * 1.1)}${currencyType}` : `${currencyType}${movs}`}</div>
        </div>`
        containerMovements.insertAdjacentHTML('afterbegin',html)
    })
}


//2.Create Usernames with Object Owners
const createUsernames = function(accs){
    accs.forEach((acc)=>{
        acc.username = acc.owner
        .toLowerCase()  //
        .split(' ')
        .map(name => name[0])
        .join('');
    });
};


createUsernames(accounts)
//3.Calcs to full balance of movments
const calcDisplayBalance = function(acc){
    const currencyType = acc.currency ==='EUR'?'€':'$'
    acc.balance = acc.movements
    .reduce((acum,cur)=>acum + Math.round(+`${acc.currency==='EUR' ? cur*1.1 : cur}`),0)
    labelBalance.textContent = `${currencyType === "€" ? `${acc.balance}${currencyType}` : `${currencyType}${acc.balance}`}`
}
//4.Displays Incoming and Outgoing Transactions Seprate
const calcDisplaySummary = function(acc){
   const movs = acc.movements.reduce((acr,cur)=>{
       //Sorts Deposits and Withdraws in 1 line
       acr[cur>0 ? 'deposits':'withdraws']+= convertCurrency(acc.currency,cur)
       return acr
       //Stores Depoits and Withdraws
    },{deposits:0,withdraws:0})
    const currencyType = acc.currency ==='EUR'?'€':'$'
   //Deposits
   labelSumIn.textContent = `${currencyType === "€" ? `${movs.deposits.toFixed(2)}${currencyType}` : `${currencyType}${movs.deposits.toFixed(2)}`}`
   //Withdraws
   labelSumOut.textContent = `${currencyType === "€" ? `${movs.withdraws.toFixed(2)}${currencyType}` : `${currencyType}${movs.withdraws.toFixed(2)}`}`
    //Calc Intrest
    const intrest = acc.movements
    .filter(mov => mov>0)
    .map(deposit=>deposit * acc.intrestRate/100)
    .filter(int=>int>=1)
    .reduce((acr,int)=>acr+int,0)
    labelSumInterest.textContent = `${currencyType === "€" ? `${intrest.toFixed(2)}${currencyType}` : `${currencyType}${intrest.toFixed(2)}`}`
}
//Checks User login and pin to display info

// Sets currentAccount to logged in person
let currentAccount;
const checkLogin = function(e){
    e.preventDefault(); 
    currentAccount = accounts.find(acc=>acc.username == inputLoginUsername.value)
    const currentDate = new Date()
    labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale).format(currentDate)
    // labelDate.textContent = `${month}/${day}/${year}, ${hour>12 ? hour-12 : hour}:${minute}${hour>12?"PM":"AM"}`

    if(currentAccount?.pin == inputLoginPin.value){
        labelWelcome.textContent= `Welcome ${currentAccount.owner.split(' ')[0]}`
    }else{
        return
    }
    containerApp.style.opacity = '1'
    updateUI(currentAccount)
    inputLoginUsername.value = inputLoginPin.value = '';
}


//Update Screen
const updateUI = function(account){
    displayMovments(account);
    calcDisplayBalance(account)
    calcDisplaySummary(account)
}
//Event Listeners
btnLogin.addEventListener('click',checkLogin)


//Transfer Money
btnTransfer.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(inputTransferAmount.value)
    const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)
    
    if(amount>0 && currentAccount.balance >= amount && receiverAcc.username !== currentAccount.username){
        inputTransferAmount.value = inputTransferTo.value = ''
        setTimeout(_=>{
            currentAccount.movements.push(-amount)
            receiverAcc.movements.push(amount);
            currentAccount.movementsDates.push((new Date().toISOString()));
            receiverAcc.movementsDates.push((new Date().toISOString()));
            updateUI(currentAccount)

        },3000)
        //Clear Inputs
    }
})
//Bank Loan Check
btnLoan.addEventListener('click',function(e){
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);

    if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){
        inputLoanAmount.value = ''
        alert('Loan Pending')
        setTimeout(_=>{
            currentAccount.movements.push(amount);
            currentAccount.movementsDates.push(new Date().toISOString())
            updateUI(currentAccount);
            alert('Loan Approved')
        },5000)
    }
    else{
        alert('Denied Request');
        inputLoanAmount.value = '';
    }
})
//Delete Account Function/Button Press
btnClose.addEventListener('click',function(e){
    e.preventDefault();
    if(currentAccount.username == inputCloseUsername.value && currentAccount.pin == inputClosePin.value){
        alert('Account Deleted');
        const index = accounts.findIndex(acc=> acc.username == currentAccount.username)
        accounts.splice(index,1)
        logOutClear();
        inputCloseUsername.value = inputClosePin.value =  '';
    }

})
//Sorting Arr
let sort = false;
btnSort.addEventListener('click',e=>{
    e.preventDefault();
    displayMovments(currentAccount,!sort);
    sort = !sort
})

const sortMovements = function (movs, dates) {
    const arrCombined = [];
    const sortedMovs = [];
    const sortedDates = [];

    movs.forEach((_, i) => arrCombined.push([movs[i], dates[i]]));
    arrCombined.sort((a, b) => a[0] - b[0]);
    arrCombined.forEach(mov => {
        sortedMovs.push(mov[0]) 
        sortedDates.push(mov[1]) 
    });
    return [sortedMovs, sortedDates];
};

const convertCurrency = function(type,cur){
   type =='EUR' ? cur = cur*1.1 : cur
   return cur
} 





//Clear Screen and Set Welcome Msg Back
const logOutClear = ()=>{
    containerApp.style.opacity = '0'
    labelWelcome.textContent = 'Log in to get started'
}






































// const convertTitleCase = function(title){
//     const expections = ['a','an','the','but','or','on','in','with','is'];

//     const titleCase = title
//     .toLowerCase()
//     .split(' ')
//     .map(word => expections.includes(word) ? word: word[0]
//     .toUpperCase()+ word
//     .slice(1))
//     .join(' ')
//     return titleCase
// }
// console.log(convertTitleCase('this is a nice Title'));



// const dogs = [
//     {weight:22,curFood:250,owners:['Alice','Bob'],},
//     {weight:8,curFood:200,owners:['Matilda'],},
//     {weight:13,curFood:275,owners:['Sarah','John'],},
//     {weight:32,curFood:340,owners:['Michael'],},
// ]

// //1
// dogs.forEach(dog=>{
//     dog.recommenedFood = Math.trunc(Number((dog.weight ** 0.75 * 28).toFixed(2)))
// })

// //2
// const dogSarah = dogs.find(dog=>dog.owners.includes('Sarah'))
// console.log(`Sarah's Dog is eating too ${dogSarah.curFood > dogSarah.recommenedFood ? "much" : "little"}!`);

// //3
// const ownersEatTooLittle = dogs
// .filter(dog=>dog.curFood < dog.recommenedFood)
// .flatMap(dog => dog.owners)

// const ownersEatTooMuch = dogs
// .filter(dog=>dog.curFood > dog.recommenedFood)
// .flatMap(dog => dog.owners)

// //4
// console.log(`${ownersEatTooMuch.join(' ')}'s Dogs are eating too much and ${ownersEatTooLittle.join(' ')}'s dogs are eating too little`);

// //6

// const checkEatingOkay = dog =>dog.curFood > (dog.recommenedFood *.90) && dog.curFood<(dog.recommenedFood * 1.10)

// const okayOwners = dogs
// .filter(checkEatingOkay)
// console.log(okayOwners);

// const dogCopy = dogs.slice().sort((a,b)=>a.recommenedFood - b.recommenedFood);

// console.log(dogCopy.map(dog=>dog.recommenedFood));

// console.log(dogs);


