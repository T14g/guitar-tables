export default class CronometerView {

    constructor(rootElement) {
        this.app = this.getElement(rootElement);
        this.cronometerElement = null;
        this.pos1 = 0;
        this.pos2 = 0;
        this.pos3 = 0;
        this.pos4 = 0;
    }

    getElement(el) {
        const element = document.querySelector(el);
        return element;
    }

    updateCronometerName(name) {
        this.getElement('.cr-title').innerHTML = name;
    }

    updateTime = (time) => {
        this.getElement('#cr-time').value = time;
    }

    setTableID = (tableID) => {
        this.getElement('#btn-salvar').dataset.idTable = tableID;
    }

    resetTime = () =>{
        this.getElement('#cr-time').value = '00:00:00';
    }

    showCronometer = (treino) => {
        this.updateCronometerName(treino.name);
        this.cronometerElement.style.display = 'block';
    }

    hideCronometer = () => {
        this.cronometerElement.style.display = 'none';
    }

    buttonsHandlers() {
        this.getElement('#close-cr').addEventListener('click', this.hideCronometer);
    }

    dragMouseDown = (e) => {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        document.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = this.elementDrag;
    }

    elementDrag = (e) => {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        this.pos1 = this.pos3 - e.clientX;
        this.pos2 = this.pos4 - e.clientY;
        this.pos3 = e.clientX;
        this.pos4 = e.clientY;
        // set the element's new position:
        this.cronometerElement.style.top = (this.cronometerElement.offsetTop - this.pos2) + "px";
        this.cronometerElement.style.left = (this.cronometerElement.offsetLeft - this.pos1) + "px";
    }

    closeDragElement = () => {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }

    dragElement = (elmnt) => {

        if (document.getElementById(elmnt.id + "header")) {
            // if present, the header is where you move the DIV from:
            document.getElementById(elmnt.id + "header").onmousedown = this.dragMouseDown;
        } else {
            // otherwise, move the DIV from anywhere inside the DIV:
            elmnt.onmousedown = this.dragMouseDown;
        }
    }


    cronometerHTML() {

        let html = `
            <div id="chronometer">
                <div class="cr-title">${this.cronometerName}</div>
                <div class="cr-display">
                    <input type="text" id="cr-time" placeholder="00:00:00" value="00:00:00"> 
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

        this.cronometerElement = this.getElement('#chronometer');
        this.dragElement(this.cronometerElement);
        this.buttonsHandlers();

    }

}