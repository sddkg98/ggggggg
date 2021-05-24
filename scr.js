const baseURL = 'https://pokeapi.co/api/v2';




const getSearch = (url, cb) =>{
    const search = new XMLHttpRequest();
    search.open('GET', url);
    search.addEventListener('load',  () => {
        const response = JSON.parse(search.response);
        cb(response)
    })
    search.addEventListener('error', err =>{
        console.log(err)
    })
    search.send();
}

const searchInput = document.querySelector('.getSearch');

window.addEventListener('load', () => {
    if(localStorage.getItem('pokemonsData')){
        return;
    }else{
        getSearch(`${baseURL}/pokemon?limit=1118`, res => {
            localStorage.setItem('pokemonsData', JSON.stringify(res.results));
        })
    }
})

const pokemonsData = JSON.parse(localStorage.getItem('pokemonsData'));

searchInput.addEventListener('input', e => {
    const filterArr = pokemonsData.filter(item => item.name.includes(e.target.value));
    if(e.target.value !== ''){
        const template = filterArr.map(item => {
            return cardTemplate(item);
        }).join('');
        container.innerHTML = template;
    }else{
        getRequest(`${baseURL}/pokemon`, 'offset=0&limit=52', res => {
            const temp = res.results.map(item => {
                return cardTemplate(item)
            }).join('');
    
            container.innerHTML=temp;
        })
    }
})


const favouritePokemons = [
    {
        id: 1,
        name: 'Pikachu',
        img: 'https://www.ivi.ru/titr/uploads/2019/05/13/566bf572a6586eb8186fc3a5dc05302d.jpg/1400x0'
    },
    {
        id:2,
        name:'Arceus',
        img:'https://www.pockettactics.com/wp-content/uploads/2021/02/pokemon-legends-arceus-release-date-900x506.jpg'
    },
    {
        id:3,
        name:'Мьюту',
        img:'https://avatars.mds.yandex.net/get-zen_doc/1857554/pub_5fdf0bbcf5a6f429fc0fefa3_5fdf0c27c80827600f247b33/scale_1200'
    },
    {
        id:4,
        name:'Zekrom ',
        img:'https://www.vhv.rs/dpng/d/136-1364742_pokemon-zekrom-plush-pokemon-zekrom-fusion-hd-png.png'
    },
    {
        id:5,
        name:'Hoopa',
        img:'https://img.pngio.com/pokemon-hoopa-and-the-clash-of-ages-anime-official-collectoons-hoopa-png-405_480.png'
    },
    {
        id:6,
        name:'Palkia',
        img:'https://img.favpng.com/20/5/11/pok-mon-platinum-giratina-darkrai-dialga-et-palkia-png-favpng-FwAJLwCdCwWqU1DNw03c5u17f.jpg'
    },
    {
        id:7,
        name:'Xerneas',
        img:'https://banner2.cleanpng.com/20190714/rot/kisspng-xerneas-video-games-zygarde-art-image-pictures-of-xerneas-rock-cafe-5d2bf51ddae3a1.5514371915631618858966.jpg'
    },
    {
        id:8,
        name:'Тундурус',
        img:'https://pokemon-go.name/wp-content/uploads/2020/03/thundurus-raid-hour-v-pokemon-go-march-4-1024x614.jpg'
    },
    {
        id:9,
        name:'Даркрай',
        img:'https://c0.klipartz.com/pngpicture/1011/472/gratis-png-pokemon-platino-giratina-darkrai-dialga-et-palkia-pokemon.png'
    },
    {
        id:10,
        name:'Энтей',
        img:'https://pokemon-go.name/wp-content/uploads/2021/01/entei-v-reidah-yanvarya-2021-v-pokemon-go.jpg'
    },
]
const carouselContainer = document.querySelector('.carouselContainer');

window.addEventListener('load', () => {
    let degrees = -40;
    const template = favouritePokemons.map((item) => {
        console.log(item);
        degrees += 40;
        return `
            <div 
                style="background-image: url('${item.img}'); transform: rotateY(  ${degrees}deg) translateZ(430px)"
                class="carousel__face"><span>${item.name}</span>
            </div>
        `
    }).join('');
    carouselContainer.innerHTML = template;
})

const getRequest = (url, query, cb) =>{
    const xhr = new XMLHttpRequest();
   
    xhr.open('GET', `${url}?${query}`);
    xhr.addEventListener('load',  () => {
        const response = JSON.parse(xhr.response);
        cb(response)
        
    })
    xhr.addEventListener('error', err =>{
        console.log(err)
    })
    xhr.send();
}


const container = document.querySelector('.cardsContainer');


window.addEventListener('load', () => {
    getRequest(`${baseURL}/pokemon`, 'offset=0&limit=60', res => {
        const temp = res.results.map(item => {
            return cardTemplate(item)
        }).join('');

        container.innerHTML=temp;
        
    })
})


function singlebtn(url){
    getRequest(url, '',res =>{
        console.log(res)
        container.innerHTML = `
      <div class="portmenu">
      
        <div class="port1">
                   <h2><a href="index.html">Назад</a></h2>
                <div>
                   <img class="img-box" src="${res.sprites.other.dream_world.front_default}" alt=""> 
                </div>
        </div>

        <section class="container-box1">
 
        <div>
                <p>ID:${res.id}</p>
                    <p>Базовый опыт: ${res.base_experience}</p>

                <div class="sta-box">
                        <h4>Статистика:
                                 <p> (${res.stats[0].base_stat}-</p>
                                <p> ${res.stats[0].stat.name})</p>
                                    /
                                <p> (${res.stats[1].base_stat}-</p>
                                <p> ${res.stats[1].stat.name})</p>
                        </h4>
 
                </div>
                <div class="sta-box">
                            <h4>Тип:
                            <p>${res.types[0].type.name}</p></h4>
 
                </div>


                            <p>высота: ${res.height} см <br> масса: ${res.weight} кг </p>
                            <p>разновидность:  <span> ${res.species.name}</span>  <b style="background: url() center/cover; width: 200px;height: 200px;"></b></p>

</div>

<div class="prites">
                            <h3>prites(спрайты):</h3>
     <p>
         <img src="${res.sprites.back_default}" alt="">
         <img src="${res.sprites.back_female}" alt="">
         <img src="${res.sprites.back_shiny}" alt="">
         <img src="${res.sprites.back_shiny_female}" alt="">
         <img src="${res.sprites.front_default}" alt="">
         <img src="${res.sprites. front_female}" alt="">
         <img src="${res.sprites.front_shiny}" alt="">
         <img src="${res.sprites.front_shiny_female}" alt="">

     </p>
</div>


</section
      
      
      
      </div>
        
        
        `
    })
}



function cardTemplate(item){
 
    return `
        <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${item.name}</span>
                    <button class="btn-more" onclick="singlebtn('${item.url}')">MORE</button>   
                </h1>
            </div>
        </div>
    `
}




const $page1 = document.querySelector('.page1')
const $page2 = document.querySelector('.page2')
const $page3 = document.querySelector('.page3')
const $page4 = document.querySelector('.page4')
const $page5 = document.querySelector('.page5')
const $page6 = document.querySelector('.page6')
const $page7 = document.querySelector('.page7')


$page1.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=0&limit=60', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page2.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=10&limit=50', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page3.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=20&limit=50', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page4.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=30&limit=50', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page5.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=30&limit=50', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page6.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=40&limit=50', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})

$page7.addEventListener('click', () =>{

    getRequest(`${baseURL}/pokemon`,'offset=50&limit=1000', res=>{
        const template = res.results.map(({name, url}) =>{
            return`
            <div class="wrapper">
            <div class="card">
                <h1 class="li-h1">
                    <li ><a href="#">Pokemon.GO</a></li>  
                    <span class="enclosed">${name}</span>
                    <button class="btn-more" onclick="singlebtn('${url}')">MORE</button>   
                </h1>
            </div>
        </div>
                
            `
        }).join('')
        container.innerHTML = template;
    })

})