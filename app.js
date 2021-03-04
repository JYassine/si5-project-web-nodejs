const map = document.querySelector("#map")

const paths = map.querySelectorAll('.map__image a')

const links = map.querySelectorAll('.map__list a')


//Polyfill
if (NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function (callback){
        [].forEach.call(this, callback)
    }
}

const activeArea = function(id){
    
    map.querySelectorAll('.is-active').forEach(function(item){
        item.classList.remove('is-active')
    })


    document.querySelector("#list-" + id).classList.add('is-active')
    document.querySelector("#Départ-" + id).classList.add('is-active')
    console.log("Nombre de cas positifs")
}


paths.forEach(function (path){
    path.addEventListener('mousecenter', function(e){
        
        const id = this.id.replace('Départ-', '')
        activeArea(id)
    })
})


links.forEach(function(link){
    link.addEventListener('mousecenter', function (){
        const id = this.id.replace('list', '')
        activeArea(id)
    })
})