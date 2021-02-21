import appData from './dados.js';
import { biggestIndex } from './utils.js';
import { getTiposTreino, newTipoHandler } from './tipo.js';


//Helper das drapOptions
function dragHelper() {
    const els = document.querySelectorAll('.train-option');
   
    [...els].map(el => {
       el.ondragstart  = (e) => {
           drag(e);
       }
    })
}

//Renderiza opções draggable para montar seu treino
const renderDragabbleOptions = async () => {
    let count = 1;
    let html = '';

    getTiposTreino().then( data => {

        if(data.length > 0){
            data.map(option =>{
                html += '<span id="elemento-' + count + '" draggable="true" class="train-option">' + option.name + '</span>';
                count++;
            })
        }

        html += '<button class="btn btn-success add-new-tipo">Adicionar</button>';
        document.querySelector('.opcoes-disponiveis').innerHTML = html;
        dragHelper();
        newTipoHandler();
    });
}
 
//Helper 
function allowDrop(ev) {
    ev.preventDefault();
}

//Salva o ID do elemento e o index do elemento se existir
function drag(ev) {
    console.log(ev.dataTransfer);
    if(ev.target.id){
        console.log(ev.dataTransfer);
        ev.dataTransfer.setData("text", ev.target.id);
        
    }
    console.log(ev.target.dataset.index);
    if(ev.target.dataset.index){
        console.log("tem ue");
        ev.dataTransfer.setData("el-index", ev.target.dataset.index);
    }
}

//Disparado ao soltar um elemento nas colunas da tabela, cria uma cópia do elemento
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var index = ev.dataTransfer.getData("el-index");

    console.log(index);

    if(data){
        var nodeCopy = document.getElementById(data).cloneNode(true);
    }else{
        var nodeCopy = document.querySelector('[data-index="' + index + '"]').cloneNode(true);
    }
    
    var newIndex = biggestIndex() + 1;

    nodeCopy.dataset.index = newIndex;
    
    ev.target.appendChild(nodeCopy);

    //Adiciona os event listeners do novo elemento
    dragHelper();
}

//Deleta um elemento solto na delete zone
function deleteElement(e) {
    var index = e.dataTransfer.getData("el-index");
    const el = document.querySelector('[data-index="' + index+ '"]');
    el.remove();
}

export { renderDragabbleOptions, allowDrop, drag, drop, deleteElement, dragHelper }