const api_Key = "2edddd9947714a808006f2243d16be8c";
const url ="https://newsapi.org/v2/everything?q=";

window.addEventListener('load',()=> fetchData("marvel"));

function reload(){
    window.location.reload();
}

async function fetchData(query){
    const res = await fetch(`${url}${query}&apikey=${api_Key}`);
    const data = await res.json();
    // console.log(data);
    bindData(data.articles);
}

function bindData(articles){

    const card = document.getElementById('cardContainer');
    const cardTemplate = document.getElementById('cardTemplate');

    card.innerHTML = '';
    
    articles.forEach(article => {
        if(!article.urlToImage) return;
        const cardClone = cardTemplate.content.cloneNode(true);

        fillData(cardClone,article);

        card.appendChild(cardClone);
    });
    
}

function fillData(cardClone, article){
    const newsImg = cardClone.querySelector('#cardImg');
    const newsTitle = cardClone.querySelector('#title');
    const newsDesc = cardClone.querySelector('#desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    })
}

const currSelectedItem = null;

function onNavItemClick(id){
    fetchData(id);
    const navItem = document.getElementById(id);
    currSelectedItem?.classList.remove('active');
    currSelectedItem = navItem;
    currSelectedItem.classList.add('active');
}

const search = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

searchButton.addEventListener('click',()=>{
    const query = search.value;
    if(!query) return;
    fetchData(query);
    currSelectedItem?.classList.remove('active');
});