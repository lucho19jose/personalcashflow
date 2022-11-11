import { phrases } from '../utils/phrases'
interface phrases {
  description: string,
  author: string
}

let quotes: phrases[] | [] = [];

function getOneQuote(){
  /* const response = await fetch('src/assets/phrases.json');
  quotes = await response.json(); */
  quotes = phrases;
  const rand = Math.floor(Math.random() * quotes.length);
  return quotes[rand];
}


export { quotes, getOneQuote }

