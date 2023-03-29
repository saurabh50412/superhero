 
const ts = "1679808063652";

const publicKey = "bbaa27fdb8caf83cfe97b4ae42c6a28b";

const privateKey = "5104d36e427f41fe30ff401a5edde9b6558939fc";

const hash = "ed098d49481e0b09818d78788f929c98";

const textSearched = document.getElementById('search-input');

const marvelLink1 = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&limit=100&offset=${(Math.random() * 100).toString()}&apikey=${publicKey}&hash=${hash}`;

let heros = [];

let searchHeros = [];

let imgContainer = document.getElementById('img-container');

textSearched.addEventListener('keypress',function(e){
    if(e.key === 'Enter'){
        searchHero();
    }
})

async function fetchMarvel(){
    try{
    const res = await fetch(marvelLink1);
    const data = await res.json();
    const characters = data.data.results;
    for(let i=0;i<characters.length;i++){
        // console.log(characters[i].name);
        let src = characters[i].thumbnail.path + ".jpg";
        let alt = characters[i].name;
        let description = characters[i].description;
        let noOfComics = characters[i].comics.available;
        let series = characters[i].series.available;
        let id =  characters[i].id;
        heros.push({
            heroName : alt,
            img : src,
            description,
            noOfComics,
            series,
            id
        })
    }
    }catch(error){
        console.log(error);
    }
    // console.log(heros);
    intoTheDom();
    return;
}
fetchMarvel();

function intoTheDom(){
    imgContainer.innerHTML = '';
    for(let hero of heros){
        let div =  document.createElement('div');
        div.className="card-container";
        div.innerHTML = `<div class="card bg-dark" style="width: 18rem;">
        <img src="${hero.img}" class="card-img-top" alt="${hero.heroName}">
        <div class="card-body">
          <h5 class="card-title text-white text-center">${hero.heroName}</h5>
          <a href="#0" class="btn btn-primary" onClick=favHeros(${hero.id},"Heros") >Add Favourite</a>
          <a href="#0" class="btn btn-primary" onClick=moreInfo(${hero.id},"Heros")>More Info</a>
        </div>
      </div>`
      imgContainer.append(div);
    }
    return;
}

async function searchHero(){
    if(textSearched.value !== ""){
        try{
            const newSearchHeros = [];
            const res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&limit=100&nameStartsWith=${textSearched.value}&apikey=${publicKey}&hash=${hash}`);
            // console.log(textSearched.value);
            const data = await res.json();
            const characters = data.data.results;
            for(let i=0;i<characters.length;i++){
                // console.log(characters[i].name);
                let src = characters[i].thumbnail.path + ".jpg";
                let alt = characters[i].name;
                let description = characters[i].description;
                let noOfComics = characters[i].comics.available;
                let series = characters[i].series.available;
                let id =  characters[i].id;
                newSearchHeros.push({
                    heroName : alt,
                    img : src,
                    description,
                    noOfComics,
                    series,
                    id
                })
            }
            // console.log(newSearchHeros);
            searchHeros = newSearchHeros;
        }catch(error){
            console.log(error);
        }
        textSearched.value = '';
        showSearchedHeros();
    }
    // console.log(searchHeros);
}

function showSearchedHeros(){
    imgContainer.innerHTML = '';
    for(let hero of searchHeros){
        let div =  document.createElement('div');
        div.className="card-container";
        div.innerHTML = `<div class="card bg-dark" style="width: 18rem;">
        <img src="${hero.img}" class="card-img-top" alt="${hero.heroName}">
        <div class="card-body">
          <h5 class="card-title text-white text-center">${hero.heroName}</h5>
          <a href="#0" class="btn btn-primary" onClick=favHeros(${hero.id},"searchHeros") >Add Favourite</a>
          <a href="#0" class="btn btn-primary mx-1" onClick=moreInfo(${hero.id},"searchHeros") >More Info</a>
         </div>
      </div>`
      imgContainer.append(div);
    }

}

function moreInfo(id,callFrom){
    imgContainer.innerHTML = '';

    if(callFrom === "Heros"){
        for(let hero of heros){
            if(hero.id === id){
                let div =  document.createElement('div');
                div.className="card-container";
                div.innerHTML = `<div class="card bg-dark" style="width: 18rem;">
                <img src="${hero.img}" class="card-img-top" alt="${hero.heroName}">
                <div class="card-body">
                <h5 class="card-title text-white text-center">${hero.heroName}</h5><p class="card-text text-white">${hero.description}</p><p class="card-text text-white">Total no of comics: ${hero.noOfComics}</p><p class="card-text text-white">Total no of series: ${hero.series}</p> 
                <a href="#0" class="btn btn-primary" onClick=favHeros(${hero.id},"Heros")>Add Favourite</a>
                </div>
                <a href="#0" class="btn btn-primary" onClick=intoTheDom() >Go back</a>
                </div>`
            imgContainer.append(div);
            }
        }
    }else{
        for(let hero of searchHeros){
            if(hero.id === id){
                let div =  document.createElement('div');
                div.className="card-container";
                div.innerHTML = `<div class="card bg-dark" style="width: 18rem;">
                <img src="${hero.img}" class="card-img-top" alt="${hero.heroName}">
                <div class="card-body">
                <h5 class="card-title text-white text-center">${hero.heroName}</h5><p class="card-text text-white">${hero.description}</p><p class="card-text text-white">Total no of comics: ${hero.noOfComics}</p><p class="card-text text-white">Total no of series: ${hero.series}</p> 
                <a href="#0" class="btn btn-primary" onClick=favHeros(${hero.id},"searchHeros")>Add Favourite</a>
                 </div>
                <a href="#0" class="btn btn-primary" onClick=showSearchedHeros() >Go back</a>
                </div>`
            imgContainer.append(div);
            }
        }
    }
}

function favHeros(id,callFrom){

    if(callFrom === "Heros"){
        for(let hero of heros){
            if(id === hero.id){
                localStorage.setItem(id,JSON.stringify(hero));
            }
        }
    }else{
        for(let hero of searchHeros){
            if(id === hero.id){
                localStorage.setItem(id,JSON.stringify(hero));
            }
        }
    }

    return;
}

function deletefavHeros(id){
    localStorage.removeItem(id);
    showfavHeros();
    return;
}

function showfavHeros(){
    if(localStorage.length>0){
        imgContainer.innerHTML='';
        for(let i=0; i<localStorage.length;i++){

            const hero = JSON.parse(localStorage.getItem(localStorage.key(i)));

            let div =  document.createElement('div');
            div.className="card-container";
            div.innerHTML = `<div class="card bg-dark" style="width: 18rem;">
            <img src="${hero.img}" class="card-img-top" alt="${hero.heroName}">
            <div class="card-body">
            <h5 class="card-title text-white text-center">${hero.heroName}</h5><p class="card-text text-white">${hero.description}</p><p class="card-text text-white">Total no of comics: ${hero.noOfComics}</p><p class="card-text text-white">Total no of series: ${hero.series}</p>
            <a href="#0" class="btn btn-primary" onClick=deletefavHeros(${hero.id})>Delete Favourite</a> 
            </div>
            </div>`
            imgContainer.append(div);
            // console.log(hero);
        }
        return;
    }
    imgContainer.innerHTML='';
}



