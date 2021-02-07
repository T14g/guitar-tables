import { tableHTML, tableDataJSON, renderDragTable, loadTableList } from './table.js';
import { handleTableEdit } from './editTable.js';
import { chronometerHandlers } from './cronometro.js';
import { handlersTempo } from './tempos.js';

//Faz um GET retornando os treinos de guitarra se existirem
function getTreinos() {
    fetch('http://localhost:3000/treinos',{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json())  // convert to json
    .then(data => renderListTreinos(data))
    .then(() => {
        setTimeout(chronometerHandlers(), 1000);
        console.log("teste");
    })    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

//Salva treinos
function saveTreino() {

    fetch('http://localhost:3000/treino',{
        method: "POST",
        body: tableDataJSON(),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    // Handle success
    .then((response) =>{

        //Limpa tabela e atualiza a lista de treinos
        clearTreinos();
        loadTableList();

    })   
    .catch(err => console.log('Request Failed', err)); // Catch errors
    
}

//GET by ID
function getTableByID(id) {
    fetch('http://localhost:3000/treino/' + id,{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        console.log(data);
        // getTreinos();
        // getNewest();
    })    
    .catch(err => console.log('Request Failed', err)); 
}

//Limpa as opções escolhidas e o nome da tabela
function clearTreinos(){
    document.querySelector('#treino-domingo').innerHTML = "";
    document.querySelector('#treino-segunda').innerHTML = "";
    document.querySelector('#treino-terca').innerHTML = "";
    document.querySelector('#treino-quarta').innerHTML = "";
    document.querySelector('#treino-quinta').innerHTML = "";
    document.querySelector('#treino-sexta').innerHTML = "";
    document.querySelector('#treino-sabado').innerHTML = "";
    document.querySelector('[name="nome-registro"]').innerHTML = "";
}


//Renderiza a lista de treinos de guitarra
function renderListTreinos (treinos){

    const idsArray = [];
    let html = ``;
    

    if(treinos.length > 0){
        let arr = treinos.reverse();
        arr.map(treino => {

            idsArray.push(treino._id);
            html += tableHTML(treino);

        }) 
    }

    document.querySelector('.treino-list-container').innerHTML = html;
    
     //Adiciona event handlers das opções
    if(idsArray.length > 0){
        idsArray.map(id => {
            optionsHelper(id, getTreinos)
        })
    }

    handlersTempo();
   
}

//GET no treino mais recente
function getNewest() {
    fetch('http://localhost:3000/treinos/newest',{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json())  // convert to json
    .then(data => renderNewest(data))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

//Renderiza o último treino criado se for encontrado
function renderNewest(treino) {

    let html = '';
    html += '<h3 class="title-big">Ultima tabela criada</h3>';
    
    if(treino && treino.length > 0 ){
        html += tableHTML(treino[0]);

        document.querySelector('#app-container').innerHTML = html;
    }else{
        document.querySelector('#app-container').innerHTML = "";
    }

    console.log(treino[0]._id);
    optionsHelper(treino[0]._id, getNewest);

    setTimeout(chronometerHandlers(), 1000);
    handlersTempo();
}

//Deleta uma tabela de treino
function deleteTreino(id , fn) {
    fetch('http://localhost:3000/treino/' + id,{
        method: "DELETE"
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        console.log(data);

        //Callback
        fn();
    })    
    .catch(err => console.log('Request Failed', err)); 

}

//Carrega a tela de criação de novas tabelas
function loadNewTable() {
    renderDragTable();

    document.querySelector('#send-form').addEventListener('click',(e) => {
        e.preventDefault();

        saveTreino();

        //Delay 1st to create and then reload home screen
        // setTimeout(function(){
        //     loadHome();
        // },1000);

    })
}


//Helper dos eventos nas opções da tabela
function optionsHelper(id, fn) {
    console.log(id);
    let seletor = '[data-table-id="' + id +'"]';
    const elements = document.querySelectorAll(seletor);
    console.log(elements);
    [...elements].map(el => {
        

        if(el.classList.contains('editar-tabela')){
            
            el.onclick = (e) => {
                const tableId = e.target.dataset.tableId;
                handleTableEdit(tableId);
            }
        }

        if(el.classList.contains('excluir-tabela')){
            el.onclick = (e) => {
                const tableId = e.target.dataset.tableId;
                deleteTreino(tableId, fn);
            }
        }
    })
}

export { getTreinos, renderListTreinos, saveTreino, getNewest,loadNewTable, optionsHelper };