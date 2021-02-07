import { renderDragabbleOptions, allowDrop, drop, deleteElement } from './draggableOptions.js';
import { getTreinos } from './treino.js';

//Faz a mágica do drag drop acontecer
function dragHelper() {

    //Handler ao dropar na coluna de criação
    const dropBoxes = document.querySelectorAll('.drop-here');
    
    [...dropBoxes].map(el=>{
        el.ondrop = (e) =>{
            console.log("evento1");
            drop(e);
        }
    });

    //Handler do dragover permitindo drop
    [...dropBoxes].map(el=>{

        el.ondragover = (e) =>{
            console.log("evento2");
            allowDrop(e);
        }
        
    });

    //Zona de delete handler
    document.querySelector('.delete-item').ondrop = (e) => {
        deleteElement(e);
    };

    document.querySelector('.delete-item').ondragover = (e) => {
        allowDrop(e);
    };

}

function tableHTML(data) {

    const nome = data.name;
    const _id = data._id;
    const dados = JSON.parse(data.json); 
    const diasArray = ['domingo','segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    let html = ``;
  
    html += `<div class="guitar-table-info">Nome da tabela: <span>${nome}</span>
        <div class="btn-group options-group">
            <button class="btn btn-secondary btn-sm dropdown-toggle btn-options" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Opções
            </button>
            <div class="dropdown-menu">
            <button class="dropdown-item editar-tabela" data-table-id="${_id}" >Editar</button>
            <button class="dropdown-item excluir-tabela" data-table-id="${_id}" >Excluir</button>
            </div>
        </div>
    </div>`;

    html += `<table class="table table-listagem">`;
    html += `<thead class="thead-dark"><tr>`;

    diasArray.map(dia => {
        html += `<th>${dia}</th>`;
    })

    html += `</tr>`;
    html += `</thead><tbody><tr>`;

    diasArray.map(dia => {
        if(dados[dia] && dados[dia].length > 0) {

            html += `<td><div class="list-${dia} list-week">`;
            // onClick="displayCronometer('${_id}','${item}')"
            dados[dia].map(item => {
                html += ` <span class="train-option">${item}<span class="watch-container"><span class="stop-watch-el"></span></span></span>`;
            })

        }else{
            html += `<td><div class="list-${dia}"></div></td>`;
        }
    })

    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;

    return html;
}

//Retorna um json com os dados para criação/update
function tableDataJSON() {
    const title = document.querySelector('[name="nome-registro"]');
    const domingo = document.querySelector('#treino-domingo');
    const segunda = document.querySelector('#treino-segunda');
    const terca = document.querySelector('#treino-terca');
    const quarta = document.querySelector('#treino-quarta');
    const quinta = document.querySelector('#treino-quinta');
    const sexta = document.querySelector('#treino-sexta');
    const sabado = document.querySelector('#treino-sabado');

    const treinos = {};

    if(domingo.children.length > 0) {
        let elements = [...domingo.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['domingo'] = arr;
    }

    if(segunda.children.length > 0) {
        let elements = [...segunda.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['segunda'] = arr;
    }

    if(terca.children.length > 0) {
        let elements = [...terca.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['terca'] = arr;
    }

    if(quarta.children.length > 0) {
        let elements = [...quarta.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['quarta'] = arr;
    }

    if(quinta.children.length > 0) {
        let elements = [...quinta.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['quinta'] = arr;
    }

    if(sexta.children.length > 0) {
        let elements = [...sexta.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['sexta'] = arr;
    }

    if(sabado.children.length > 0) {
        let elements = [...sabado.children];
        let arr = [];

        elements.map(el=>{
           arr.push(el.innerHTML);
        })

        treinos['sabado'] = arr;
    }
    

    let jsonObject = {
        'name' : title.value,
        'json' : JSON.stringify(treinos)
    };

    return JSON.stringify(jsonObject);
}

//HTML da tabela com drag options
function renderDragTable() {
    let html = `
    <div class="row mt-5">
        <div class="col-md-12">

        <h4 class="mb-3">Planeje a semana na guitarra</h4>
        <p class="bolder">Digite um nome no campo abaixo antes de salvar a tabela</p>
        <input type="text" class="mb-2 form-control" name="nome-registro" class="form-control" placeholder="!!! Digite um nome aqui para o treino antes de salvar!!!">

        <div class="opcoes-disponiveis"></div>

            <div class="delete-item" >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
            <span>Solte aqui para excluir</span>
            </div>
            <table class="table table-guitar-drops">
            <thead class="thead-dark">
                <tr>
                    <th>Domingo</th>
                    <th>Segunda</th>
                    <th>Terça</th>
                    <th>Quarta</th>
                    <th>Quinta</th>
                    <th>Sexta</th>
                    <th>Sábado</th>
                </tr>
            </thead>
                
            <tbody>
                <tr>
                <td>
                    <div class="drop-here" id="treino-domingo"    ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-segunda"   ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-terca"   ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-quarta"   ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-quinta"   ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-sexta"   ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-sabado"   ></div>
                </td>
                </tr>
            </tbody>
            </table>
            
            <button class="btn btn-dark btn-lg btn-block mb-3" type="submit" id="send-form">Salvar tabela</button>
        </div> 
        </div>
    </div>
    `;

    document.querySelector('#app-container').innerHTML = html;
    
    renderDragabbleOptions();

    dragHelper();
}

//Carrega a lista de tabelas
function loadTableList() {
    let html = `
    <div class="row">
        <div class="col-md-12">
            <h3 class="mb-3">Treinos encontrados</h3>
            <div class="treino-list-container">

            </div>
        </div>
    </div>`

    document.querySelector('#app-container').innerHTML = html;

    getTreinos();
}

export { tableHTML, renderDragTable, tableDataJSON, loadTableList };