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
    }else{
      transactions = [];
      transactions.unshift(newOnetransaction)
    }
    LocalStorage.set('transactions', transactions);
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

const settoaccounts = (accountpercentajes: number[], amount: number) => {
  try {
    const accounts: number[] | null = LocalStorage.getItem('accounts');
    if(accounts && accounts?.length>0){
      for(let i = 0; i<accountpercentajes.length; i++){
        console.log(parseFloat((amount*accountpercentajes[i]/100).toString()).toFixed(2));
        
        accounts[i] = Number(parseFloat((accounts[i] + amount*accountpercentajes[i]/100).toString()).toFixed(2))
      }
      LocalStorage.set('accounts', accounts);
    }else{
      const arrayAccount: number[] = [];
      for(let i = 0; i<accountpercentajes.length; i++){
        arrayAccount?.push(amount*accountpercentajes[i]/100)
      }
      LocalStorage.set('accounts', arrayAccount);
    }
    console.log('accounts', accounts);
    return 200;
  } catch (error) {
    console.log(error);
    return 500;
  }
}

const settospecificaccount = (account: number, amount: number, type = 'income') => {
  try {
    const accounts: number[] | null = LocalStorage.getItem('accounts');
    if(accounts && accounts?.length>0){
      if(type == 'expense'){
        
        accounts[account] = Number(parseFloat((accounts[account] - amount).toString()).toFixed(2))
      }else{
        accounts[account] = Number(parseFloat((accounts[account] + amount).toString()).toFixed(2))
      }
      
      LocalStorage.set('accounts', accounts);
      console.log('accounts', accounts);
      return 200;
    }else{
      throw 'something went wrong';
      return 500;
    }
  } catch (error) {
    return 500;
  }
}

const getAccounts = () => {
  const accounts: number[] | null = LocalStorage.getItem('accounts');
  if(accounts){
    return accounts;
  }
  return [];
}

export { getStorageData, saveNewRecord, removeRecord, settoaccounts, settospecificaccount, getAccounts };
export type { transactionformat };
