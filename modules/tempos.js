import { showModal, setModalContent, blockScroll } from './modal.js';

//Retorna os tempos de uma tabela
function getTempos(tabela) {
    fetch('http://localhost:3000/tempos/' + tabela, {
        method: "GET"
    })
        // Handle success
        .then(response => response.json())
        .then(data => {
            const html = formatHTML(data);
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

    if (data.length > 0) {
        data.map(el => {
            html += `<li><span class="titulo-treino">${el.titulo} - Tempo: ${el.tempo}</span></li>`
        })
    }

    html += `</ul>`;

    return html;
}


export { getTempos, handlersTempo };