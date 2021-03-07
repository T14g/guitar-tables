export default class TemposView {

    constructor() {

    }

    temposHTML = (data) => {
        let html = `<ul>`;

        if (data.length > 0) {
            data.map(el => {
                html += `<li><span class="titulo-treino">${el.titulo} - Tempo: ${el.tempo}</span></li>`
            })
        }

        html += `</ul>`;

        return html;
    }

}