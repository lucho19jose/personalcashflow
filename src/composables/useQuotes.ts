interface phrases {
  description: string,
  author: string
}

let quotes: phrases[] | [] = [];

fetch('src/assets/phrases.json')
  .then(response => response.json())
  .then((json) => {
    console.log(json)
    quotes = json;
  });

  function getOneQuote(){
    const rand = Math.floor(Math.random() * quotes.length);
    return quotes[rand];
  }


export { quotes, getOneQuote }

