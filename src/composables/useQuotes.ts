interface phrases {
  description: string,
  author: string
}

let quotes: phrases[] | [] = [];

async function getOneQuote(){
  const response = await fetch('src/assets/phrases.json');
  quotes = await response.json();
  const rand = Math.floor(Math.random() * quotes.length);
  return quotes[rand];
}


export { quotes, getOneQuote }

