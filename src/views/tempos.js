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

    renderPlayedTime = (parts, container) => {
        console.log(parts);
        // console.log(container);
        let html = ``;
        html += `<p>Você já tocou por : ${parts[0]}h: ${parts[1]}min : ${parts[2]}s</p>`;
        document.querySelector(container).innerHTML = html;

    }

}