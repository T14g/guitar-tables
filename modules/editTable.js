import { renderDragTable, loadTableList, tableDataJSON } from './table.js';
import { dragHelper as optionsDragHelper } from './draggableOptions.js';
//Event handler da edição
function handleTableEdit(id) {

    fetch('http://localhost:3000/treino/' + id,{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        renderEditing(data);
    })     
    .catch(err => console.log('Request Failed', err)); 

}

//Render editing Screen
function renderEditing(data) {

    renderDragTable();
    document.querySelector('[name="nome-registro"]').value = data.name;

    const _id = data._id;
    let treinos = JSON.parse(data.json);
    let elementNumber = 1;
    const diasArray = ['domingo','segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];

    diasArray.map(dia => {
        if(treinos[dia] && treinos[dia].length > 0){
            let html = ``;
    
            treinos[dia].map(item => {
                html += ` <span  draggable="true" data-index=${elementNumber} draggable="true" class="train-option">${item}</span>`;
                elementNumber++;
            })
    
            document.querySelector('#treino-' + dia + '').innerHTML = html;
        }
    });

    //Adiciona event handlers das opções
    optionsDragHelper();

    document.querySelector('#send-form').addEventListener('click',(e) => {
        e.preventDefault();

        updateTable(_id);

        //Delay 1st to create and then reload home screen
        setTimeout(function(){
            loadTableList();
        },1000);

    })
    
}

//Atualiza uma tabela
//Event handler da edição
function updateTable(id) {

    const data = tableDataJSON();

    fetch('http://localhost:3000/treino/' + id,{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "PATCH",
        body: data
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
 
    })     
    .catch(err => console.log('Request Failed', err)); 

}

export { handleTableEdit };