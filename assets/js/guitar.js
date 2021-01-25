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
            
            html += '<td><select onChange="handleCategoryChange(event)" class="form-control category-select" name=select-' + i+ '-' + k +'>';
            html += '<option selected="true" disabled="disabled">Selecione</option>';
            opcoesSelect.map(opcao=>{
                html += '<option value='+ opcao.nome  + '>' + opcao.nome + '</option>';
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
        'json' : treinos
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

