export default class CronometerView {

    constructor(rootElement) {
        this.app = this.getElement(rootElement);
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    cronometerHTML(data) {

        let html = `
            <div id="chronometer">
                <div class="cr-title">${data.name}</div>
                <div class="cr-display">
                    <input type="text" id="cr-time" placeholder="00:00:00"> 
                </div>
                
                <div id="buttons">
                    <div class="btn-box-cr">
                        <button class="btn-success btn" id="start-cr">Start</button>
                        <button class="btn-danger btn" id="stop-cr">Stop</button>
                    </div>
                    
                    <div class="btn-box-cr">
                        <button class="btn-info btn" id="clear-cr">Clear</button>
                        <button class="btn-danger btn" id="close-cr">Close</button>
                    </div>

                    <div class="btn btn-success" id="btn-salvar" data-id_table="">Salvar</div>
            </div></div>`;

        return html;
    }

    renderCronometer() {
        let data = { name: 'Cronometer Name' };
        const html = this.cronometerHTML(data);
        this.app.insertAdjacentHTML('afterend', html);
    }

}