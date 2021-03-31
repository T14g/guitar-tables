export default class TiposView {

    constructor(containerElement) {
        this.containerElement = document.querySelector(containerElement);
    }

    toggleDrag = () => {
        const els = document.querySelectorAll('.train-option');
        [...els].map(el => {
            el.ondragstart = (e) => {
                this.drag(e);
            }
        })
    }

    toggleDrop() {
        const dropBoxes = document.querySelectorAll('.drop-here');

        [...dropBoxes].map(el => {
            el.ondrop = (e) => {
                this.drop(e);
            }
        });

        [...dropBoxes].map(el => {
            el.ondragover = (e) => {
                this.allowDrop(e);
            }
        });

        document.querySelector('.delete-item').ondrop = (e) => {
            this.deleteElement(e);
        };

        document.querySelector('.delete-item').ondragover = (e) => {
            this.allowDrop(e);
        };
    }

    biggestIndex() {
        let elements = document.querySelectorAll('[data-index]');
        let biggest = 0;

        if (elements.length > 0) {
            let array = [...elements];

            array.map(el => {
                if (parseInt(el.dataset.index) > biggest) {
                    biggest = parseInt(el.dataset.index);
                }
            })
        }

        return biggest;
    }

    tiposHTML = (data) => {
        let count = 1;
        let html = '';

        if (data.length > 0) {
            data.map(option => {
                html += '<span id="elemento-' + count + '" draggable="true" class="train-option">' + option.name + '</span>';
                count++;
            })
        }

        html += '<button class="btn btn-success add-new-tipo">Adicionar</button>';
        return html;
    }

    renderTipos = (data) => {
        let html = this.tiposHTML(data);
        this.containerElement.innerHTML = html;
        this.toggleDrag();
        this.toggleDrop();
    }

    allowDrop = (e) => {
        e.preventDefault();
    }

    drag = (e) => {

        if (e.target.id) {
            e.dataTransfer.setData("text", e.target.id);
        }

        if (e.target.dataset.index) {
            e.dataTransfer.setData("el-index", e.target.dataset.index);
        }
    }

    drop = (e) => {

        let data = e.dataTransfer.getData("text");
        let index = e.dataTransfer.getData("el-index");
        let nodeCopy;

        if (data) {
            nodeCopy = document.getElementById(data).cloneNode(true);
        } else {
            nodeCopy = document.querySelector('[data-index="' + index + '"]').cloneNode(true);
        }

        let newIndex = this.biggestIndex() + 1;
        nodeCopy.dataset.index = newIndex;
        e.target.appendChild(nodeCopy);

        this.toggleDrag();
    }

    deleteElement = (e) => {
        let index = e.dataTransfer.getData("el-index");
        const el = document.querySelector('[data-index="' + index + '"]');
        el.remove();
    }

}