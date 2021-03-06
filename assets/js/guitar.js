const appData = {
    Fundamentos : [
        {
            id: 1,
            nome: 'Palhetada alternada'
        },
        {
            id: 2,
            nome: 'Legato'
        },
        {
            id: 2,
            nome: 'Sweap'
        },
        {
            id: 3,
            nome: 'Alternada + Legato'
        },
        {
            id: 4,
            nome: 'Livre/Fundamentos'
        },
        {
            id: 5,
            nome: 'Acordes'
        }
    ],
    Tecnica: [
        {
            id: 1,
            nome: 'Técnica'
        }
    ],
    Harmonia: [
        {
            id: 1,
            nome: 'Triade'
        },
        {
            id: 2,
            nome: 'Tetrade'
        },
        {
            id: 3,
            nome: 'Func Harmônica'
        },
        {
            id: 4,
            nome: 'CAGED'
        },
        {
            id: 5,
            nome: 'Triade + Tetrade'
        },
        {
            id: 6,
            nome: 'Livre/Harmonia'
        }
    ],
    Improviso : [
        {
            id: 1,
            nome: 'Pentatônica Menor7'
        },
        {
            id: 2,
            nome: 'Penta Blues'
        },
        {
            id: 3,
            nome: 'Modo Grego Maior'
        },
        {
            id: 4,
            nome: 'Modo Grego Menor'
        },
        {
            id: 5,
            nome: 'Livre/Improviso'
        },
        {
            id: 6,
            nome: 'Pentatonic G'
        }
    ],
    Leitura : [
        {
            id: 1,
            nome: 'Pentagrama'
        },
        {
            id: 2,
            nome: 'Figuras e pausas'
        },
        {
            id: 3,
            nome: 'Forma de compasso'
        },
        {
            id: 4,
            nome: 'Livre/Leitura'
        },
    ]
}


const renderCategories = () => {

    // 7 dias , 4 partes ao dia / 15min each
    let count = 1;
    let categories = Object.keys(appData);
    let html = '';
    let opcoesSelect = [];

    categories.map(cat=>{
        if(appData[cat].length > 0 ){
            opcoesSelect = [...opcoesSelect, ...appData[cat]];
        }
    })

    for(var i = 1; i <= 4 ;i++) {

        html += '<tr>';

        for(var k = 1; k <= 7 ;k++) {
            
            html += '<td><select class="form-control category-select" name=select-' + i+ '-' + k +'>';
            html += '<option selected="true" disabled="disabled">Selecione</option>';
            opcoesSelect.map(opcao=>{
                html += '<option value="'+ opcao.nome  + '">' + opcao.nome + '</option>';
            })

            html += '</td></select>';

        }

        html += '</tr>';
    }

    document.querySelector('.table-guitar tbody').innerHTML = html;

}

// renderCategories();

const handleCategoryChange = (e) =>{
    e.target.innerHTML = '<option>' + e.target.value + '</option>';
}



//Faz um GET retornando os treinos de guitarra se existirem
const getTreinos = () => {
    fetch('http://localhost:3000/treinos',{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json())  // convert to json
    .then(data => renderListTreinos(data))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
}

//Renderiza a lista de treinos de guitarra
const renderListTreinos = (treinos) => {
    console.log(treinos);
    let html = ``;

    if(treinos.length > 0){
        let arr = treinos.reverse();
        arr.map(treino => {

            html += tableHTML(treino);
        
        }) 
    }

    document.querySelector('.treino-list-container').innerHTML = html;
}

//Renderiza opções draggable para montar seu treino
const renderDragabbleOptions = () =>{

    let categories = Object.keys(appData);
    let html = '';
    let dragOptions = [];
    let count = 1;

    categories.map(cat=>{
        if(appData[cat].length > 0 ){
            dragOptions = [...dragOptions, ...appData[cat]];
        }
    })

    dragOptions.map(option =>{
        html += '<span id="elemento-' + count + '" draggable="true" ondragstart="drag(event)" class="train-option">' + option.nome + '</span>';
        count++;
    })


    document.querySelector('.opcoes-disponiveis').innerHTML = html;
}


//Helper 
function allowDrop(ev) {
    ev.preventDefault();
}

//Salva o ID do elemento e o index do elemento se existir
function drag(ev) {

    if(ev.target.id){
        ev.dataTransfer.setData("text", ev.target.id);
    }
    
    if(ev.target.dataset.index){
        ev.dataTransfer.setData("el-index", ev.target.dataset.index);
    }
}

//Encontra o maior index se existir de um elemento com index
function biggestIndex(){
    let elements = document.querySelectorAll('[data-index]');
    let maior = 0;
    
    if(elements.length > 0){

        let array = [...elements];

        array.map(el=> {
            if(parseInt(el.dataset.index) > maior){
                maior = parseInt(el.dataset.index);
            }
        })
    }

    return maior;
}


//Disparado ao soltar um elemento nas colunas da tabela, cria uma cópia do elemento
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var index = ev.dataTransfer.getData("el-index");

    if(data){
        var nodeCopy = document.getElementById(data).cloneNode(true);
    }else{
        var nodeCopy = document.querySelector('[data-index="' + index + '"]').cloneNode(true);
    }
    
    var newIndex = biggestIndex() + 1;

    nodeCopy.dataset.index = newIndex;
    
    ev.target.appendChild(nodeCopy);
}

//Deleta um elemento solto na delete zone
function deleteElement(e) {
    var index = e.dataTransfer.getData("el-index");
    el = document.querySelector('[data-index="' + index+ '"]');
    el.remove();
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
        getTreinos();
    })   
    .catch(err => console.log('Request Failed', err)); // Catch errors
    

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
}


//Retorna o código HTML de uma tabela
function tableHTML(data) {
    // console.log(data);
    let nome = data.name;
    let _id = data._id;
    let dados = JSON.parse(data.json); 
    let html = ``;

    // html += `<h4>${nome}</h4>`;
    html += `<div class="guitar-table-info">Nome da tabela: <span>${nome}</span>
    <div class="btn-group options-group">
    <button class="btn btn-secondary btn-sm dropdown-toggle btn-options" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        Opções
    </button>
    <div class="dropdown-menu">
        <button class="dropdown-item" onClick="handleTableEdit('${_id}')">Editar</button>
        <button class="dropdown-item" onClick="deleteTreino('${_id}')">Excluir</button>
    </div>
    </div>
    </div>`;

    html += `<table class="table table-listagem">`;
    html += `<thead class="thead-dark"><tr>`
        
    html += `<th>Domingo</th>`;
    html += `<th>Segunda</th>`;
    html += `<th>Terça</th>`;
    html += `<th>Quarta</th>`;
    html += `<th>Quinta</th>`;
    html += `<th>Sexta</th>`;
    html += `<th>Sábado</th>`;
    html += `</tr>`;
    html += `</thead><tbody><tr>`;

    if(dados.domingo && dados.domingo.length > 0){
        html += `<td><div class="list-domingo list-week">`;

        dados.domingo.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-domingo"></div></td>`;
    }

    if(dados.segunda && dados.segunda.length > 0){
        html += `<td><div class="list-segunda list-week">`;

        dados.segunda.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-segunda"></div></td>`;
    }

    if(dados.terca && dados.terca.length > 0){
        html += `<td><div class="list-terca list-week">`;

        dados.terca.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-terca"></div></td>`;
    }

    if(dados.quarta && dados.quarta.length > 0){
        html += `<td><div class="list-quarta list-week">`;

        dados.quarta.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-quarta"></div></td>`;
    }

    if(dados.quinta && dados.quinta.length > 0){
        html += `<td><div class="list-quinta list-week">`;

        dados.quinta.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-quinta"></div></td>`;
    }

    if(dados.sexta && dados.sexta.length > 0){
        html += `<td><div class="list-sexta list-week">`;

        dados.sexta.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el" onClick="displayCronometer('${_id}', '${item}')"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-sexta"></div></td>`;
    }

    if(dados.sabado && dados.sabado.length > 0){
        html += `<td><div class="list-sabado list-week">`;

        dados.sabado.map(item => {
            html += ` <span class="train-option">${item}<span class="watch-container" onClick="displayCronometer('${_id}','${item}')"><span class="stop-watch-el"></span></span></span>`;
        })

        html +=`</td>`;
    }else{
        html += `<td><div class="list-sabado"></div></td>`;
    }

    html += `</tr>`;
    html += `</tbody>`;
    html += `</table>`;
    

    return html;
}

//Deleta uma tabela de treino
function deleteTreino(id) {
    fetch('http://localhost:3000/treino/' + id,{
        method: "DELETE"
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        console.log(data);
        getTreinos();
        getNewest();
    })    
    .catch(err => console.log('Request Failed', err)); 

    
}

//Carrega a tela inicial
function loadHome() {
    getNewest();
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

            <div class="delete-item" ondrop="deleteElement(event)"  ondragover="allowDrop(event)">
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
                    <div class="drop-here" id="treino-domingo" ondrop="drop(event)"  ondragover="allowDrop(event)"  ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-segunda" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-terca" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-quarta" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-quinta" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-sexta" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
                </td>
                <td>
                    <div class="drop-here" id="treino-sabado" ondrop="drop(event)"  ondragover="allowDrop(event)" ></div>
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
}

//Carrega a tela de criação de novas tabelas
function loadNewTable() {
    renderDragTable();

    document.querySelector('#send-form').addEventListener('click',(e) => {
        e.preventDefault();

        saveTreino();

        //Delay 1st to create and then reload home screen
        setTimeout(function(){
            loadHome();
        },1000);

    })
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

//Carrega event listeners da navbar
function loadNavListeners() {
    document.querySelector('.load-home').addEventListener('click', function(event){
        event.preventDefault();

        loadHome();
    })

    document.querySelector('.botao-nova').addEventListener('click', function(event){
        event.preventDefault();

        loadNewTable();
    })

    document.querySelector('.botao-listar').addEventListener('click', function(event){
        event.preventDefault();

        loadTableList();
    })
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

//Event handler da edição
function handleTableEdit(id) {

    fetch('http://localhost:3000/treino/' + id,{
        method: "GET"
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        renderEditing(data);
        // getTreinos();
        // getNewest();
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


    if(treinos.domingo && treinos.domingo.length > 0){
        let html = ``;

        treinos.domingo.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" draggable="true" ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-domingo').innerHTML = html;
    }

    if(treinos.segunda && treinos.segunda.length > 0){
        let html = ``;

        treinos.segunda.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-segunda').innerHTML = html;
    }

    if(treinos.terca && treinos.terca.length > 0){
        let html = ``;

        treinos.terca.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-terca').innerHTML = html;
    }

    if(treinos.quarta && treinos.quarta.length > 0){
        let html = ``;

        treinos.quarta.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-quarta').innerHTML = html;
    }

    if(treinos.quinta && treinos.quinta.length > 0){
        let html = ``;

        treinos.quinta.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-quinta').innerHTML = html;
    }

    if(treinos.sexta && treinos.sexta.length > 0){
        let html = ``;

        treinos.sexta.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-sexta').innerHTML = html;
    }

    if(treinos.sabado && treinos.sabado.length > 0){
        let html = ``;

        treinos.sabado.map(item => {
            html += ` <span  draggable="true" data-index=${elementNumber} ondragstart="drag(event)" class="train-option">${item}</span>`;
            elementNumber++;
        })

        document.querySelector('#treino-sabado').innerHTML = html;
    }

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



//Exibe o cronômetro para determinada atividade do treino
function displayCronometer(id, name) {
    
    clearTimeout(t);
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;

    document.querySelector('#btn-salvar').dataset.id_table = id;
    document.querySelector('#chronometer').style.display = 'block';
    document.querySelector('.cr-title').innerHTML = name;

}

dragElement(document.getElementById("chronometer"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

//APP Init functions()
loadNavListeners();
loadHome();


//Chronometer stuff
var crDisplay = document.querySelector('.cr-display'),
    startBtn = document.querySelector('#start-cr'),
    stopBtn = document.querySelector('#stop-cr'),
    clearBtn = document.querySelector('#clear-cr'),
    closeBtn = document.querySelector('#close-cr'),
    seconds = 0, minutes = 0, hours = 0,
    t;

closeBtn.onclick = function() {
    clearTimeout(t);
    console.log("fechar");
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    document.querySelector('#chronometer').style.display = 'none';
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    crDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}


/* Start button */
startBtn.onclick = timer;

/* Stop button */
stopBtn.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
clearBtn.onclick = function() {
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}


//Salva um registro de tempo

function saveTime(e){
    const id_table = e.target.dataset.id_table;
    const titulo = document.querySelector('.cr-title').innerHTML;

    let data = {
        titulo: titulo,
        table_id : id_table,
        tempo : crDisplay.textContent
    }

    fetch('http://localhost:3000/tempos',{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        console.log(data);
    })     
    .catch(err => console.log('Request Failed', err)); 
}


//Handler do botão salvar

document.querySelector('#btn-salvar').addEventListener('click', function(e){
    clearTimeout(t);
    saveTime(e);
})