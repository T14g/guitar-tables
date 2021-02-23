import appData from "./dados.js";
import { renderDragabbleOptions } from './draggableOptions.js';

const createTipoTreino = async (category, name) => {

    let data = { name: name , category: category};
    await fetch('http://localhost:3000/tipo/',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(result =>{
        console.log(result);
    })
    
}

function bulkADDTipos () {
    console.log('bulk add');
    let categories = Object.keys(appData);
    
       categories.map(cat=>{
            if(appData[cat].length > 0 ){
                appData[cat].map(item =>{
                    createTipoTreino(cat, item.nome);
                })
            }
        })
}


const getTiposTreino = async () => {
    const result = await fetch('http://localhost:3000/tipo/',{
        method: "GET",
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    return result;
}

function newTipoHandler(){
    document.querySelector('.add-new-tipo').addEventListener('click', function(e){
        
        let data = prompt("Digite a categoria e o nome do tipo de treino. ex Acordes;menores");
        let parts = data.split(';');

        createTipoTreino(parts[0], parts[1]).then(()=>{
            renderDragabbleOptions();
        })
    })
}

export { createTipoTreino, getTiposTreino, newTipoHandler };