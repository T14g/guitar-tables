import appData from "./dados.js";

const createTipoTreino = async (category, name) => {

    let data = { name: name , category: category};
    await fetch('http://localhost:3000/tipo/',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(result =>{
        console.log(result);
        console.log("enviando post com name " + name);
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
    .then(response => response.json()) 

    return result;
}






export { createTipoTreino, getTiposTreino };