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

renderCategories();

const handleCategoryChange = (e) =>{
    e.target.innerHTML = '<option>' + e.target.value + '</option>';
}

document.querySelector('#send-form').addEventListener('click',(e) => {
    e.preventDefault();

    sendRequest();
})

const sendRequest = () => {

    const formElement = document.querySelector('.form-guitar');
    let formSize = formElement.elements.length;
    const title = document.querySelector('[name="nome-registro"]');

    let treinos = {};

    for(let i = 0 ; i < formSize ; i++) {
        let el = formElement.elements[i];

        if(el.nodeName === "SELECT"){
            treinos[el.name] = el.value;
        }
       
    }

    let jsonObject = {
        'name' : title.value,
        'json' : JSON.stringify(treinos)
    };

    fetch('http://localhost:3000/treino',{
        method: "POST",
        body: JSON.stringify(jsonObject),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    // Handle success
    .then(response => response.json())  // convert to json
    .then(json => console.log(json))    //print data to console
    .catch(err => console.log('Request Failed', err)); // Catch errors
    
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
        treinos.map(treino => {

            let nome = treino.name;
            let dados = JSON.parse(treino.json);
            let arrayTreinos = Object.values(dados);
            let size = arrayTreinos.length;

            html += `<h4>${nome}</h4>`;
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
            html += `</thead><tbody>`;

            if(size > 0){
                
                for(let i = 0; i < size; i++){
                    if(i === 0){
                        html += `<tr>`;
                    }

                    if(i === 7){
                        html += `</tr>`;
                        html += `<tr>`;
                    }

                    if(i === 14){
                        html += `</tr>`;
                        html += `<tr>`;
                    }

                    if(i === 21){
                        html += `</tr>`;
                        html += `<tr>`;
                    }

                    if(i === 28){
                        html += `</tr>`;
                    }

                    html += `<td>${arrayTreinos[i]}</td>`;
                }
            }
            
 
            html += `</tbody></table>`;
        
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

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

getTreinos();
renderDragabbleOptions();