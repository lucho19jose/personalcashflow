/* import { ref } from 'vue'; */
import { LocalStorage } from 'quasar'

interface transactionformat {
  id: number,
  amount: number;
  category?: string;
  description: string;
  date: string | Date,
  type: 'expense' | 'income',
}


const getStorageData = (): transactionformat[] | null => {
  const transactions: transactionformat[] | null = LocalStorage.getItem('transactions');
  return transactions;
}

const saveNewRecord = (newOnetransaction: transactionformat) => {
  try {
    let transactions: transactionformat[] | null = LocalStorage.getItem('transactions');
    console.log('transactions1', transactions);

    if(transactions){
      console.log('transactions2', transactions);
      
      transactions?.unshift(newOnetransaction)
      console.log('transactions3', transactions);
      LocalStorage.set('transactions', transactions);
    }else{
      transactions = [];
      transactions.unshift(newOnetransaction)
      LocalStorage.set('transactions', transactions);
    }
    return 200;
  } catch (error) {
    return 500;
  }
}

const removeRecord = (position: number) => {
  try {
    let transactions: transactionformat[] | null = LocalStorage.getItem('transactions');
    if(transactions){
      transactions?.splice(position, 1);
      LocalStorage.set('transactions', transactions);
      return 200;
    }else{
      transactions = []/* just for typescript error */
    }
  } catch (error) {
    console.log(error);
    return 500;
  }
}

export { getStorageData, saveNewRecord, removeRecord };
export type { transactionformat };
