export default class TiposController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    onDisplayTipos = () => {
        this.model.getTipos()
            .then(tipos => {
                this.view.renderTipos(tipos);
            })
    }
}