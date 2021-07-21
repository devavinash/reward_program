function calculateRewards(price) {
    if (price >=50 && price < 100) {
        return price-50;
    } else if (price >100){
        return (2*(price-100) + 50);
    }
    return 0;
}

class Transaction {
    constructor(price, index) {
        this.price = price;
        this.rewards = calculateRewards(price);
        this.transactionDate = new Date();
        this.id = index
    }
}

class TransactionList {
    constructor() {
        this.list = [];
    }

    getLast3MonthsList() {
        var today = new Date();
        const threeOldDate = today.setMonth(today.getMonth() - 3);
        let filteredList = this.list.filter(trans => trans.transactionDate > threeOldDate);
        return filteredList.sort((a,b) => b.transactionDate - a.transactionDate);
    }

    getAllTransactions() {
        return this.list.sort((a,b) => b.transactionDate-a.transactionDate);
    }

    addTransaction(price, id) {
        const transaction = new Transaction(price, id);
        this.list.push(transaction);
    }

    getTotalRewards() {
        return this.list.length ? this.list.reduce((acc,key)=>key.rewards+acc, 0) : 0;
    }

    rewardPerMonth() {
        let last3MonthRewardsInDesc = [];
        for(let i=0; i<3; i++) {
            let filteredList = this.list.filter(trans => trans.transactionDate.getMonth() === (new Date()).getMonth() - i );
            last3MonthRewardsInDesc[i] = filteredList.reduce((acc,key)=>key.rewards+acc,0);
        }
        return last3MonthRewardsInDesc;
    }
}

export default TransactionList