export default class TiposController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    onDisplayTipos = () => {
        this.model.getTipos()
            .then(tipos => {
                this.view.renderTipos(tipos);
                this.onCreateHandler();
            })
    }

    onCreateHandler = () => {
        document.querySelector('.add-new-tipo').addEventListener('click', this.onCreate );
    }

    onCreate = () => {
        let data = prompt("Digite a categoria e o nome do tipo de treino. ex Acordes;menores");
        let parts = data.split(';');

        this.model.newTipo(parts[0], parts[1])
            .then((result) => {
                this.onDisplayTipos();
            })
    }
}