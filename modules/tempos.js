import { showModal, setModalContent, blockScroll } from './modal.js';

//Retorna os tempos de uma tabela
function getTempos(tabela) {
    fetch('http://localhost:3000/tempos/' + tabela, {
        method: "GET"
    })
        // Handle success
        .then(response => response.json())
        .then(data => {
            const tempos = totalTime(data);
            const html = formatHTML(tempos);
            const title = "Tempos registrados";

            setModalContent(title, html);
            blockScroll();
            showModal();
        })
        .catch(err => console.log('Request Failed', err));
}


//Adiciona o event handler do getTempo
function handlersTempo() {

    const elements = document.querySelectorAll('.tempos-tabela');

    [...elements].map(el => {

        el.onclick = (e) => {
            let _id = e.target.dataset.tableId;
            getTempos(_id);
        }

    })
}


//Formata a lista de tempos
function formatHTML(data) {
    let html = `<ul>`;
    console.log(data);
    if (data.length > 0) {
        data.map(el => {
            html += `<li><span class="titulo-treino">${el.nome} - Tempo: ${el.tempo}</span></li>`
        })
    }

    html += `</ul>`;

    return html;
}

//Retorna um Objeto com os tempos totais de cada tipo
function totalTime(data) {
    let tempos = {};

    if (data.length > 0) {
        data.map(item => {
            console.log(item.titulo)
            if (!(item.titulo in tempos)) {
                tempos[item.titulo] = item.tempo;
            } else {
                tempos[item.titulo] = somarTempo(tempos[item.titulo], item.tempo);
            }
        })
    }

    let keys = Object.keys(tempos);
    let results = [];

    keys.map(key => {
        let obj = { nome: key, tempo: tempos[key] };
        results.push(obj);
    });

    return results;

}

//Soma o tempo em h,m,s e retorna uma string do tempo
function somarTempo(initial, summ) {

    const initialSplit = initial.split(':');
    const summSplit = summ.split(':');
    let h, m, s, result;

    console.log(initialSplit);
    console.log(summSplit);

    h = parseInt(initialSplit[0]) + parseInt(summSplit[0]);
    m = parseInt(initialSplit[1]) + parseInt(summSplit[1]);
    s = parseInt(initialSplit[2]) + parseInt(summSplit[2]);

    while (s >= 60) {
        m += 1;
        s -= 60;
    }

    while (m >= 60) {
        h += 1;
        m -= 60;
    }

    //Transforma em strings com extra 0's quando necessário
    h = extraZero(h);
    m = extraZero(m);
    s = extraZero(s);

    result = `${h}:${m}:${s}`;
    return result;
}

//Adiciona zeros caso haja apenas um dígito e retorna em string
function extraZero(number) {

    let numberStr = number.toString();

    if (numberStr.length === 1) {
        numberStr = '0' + numberStr;
    }

    return numberStr;
}

export { getTempos, handlersTempo };