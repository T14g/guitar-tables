export default class TreinosController{

    constructor (model, view) {
        this.model = model;
        this.view  = view;
        this.onLoadNewest();
    }

    onLoadNewest() {
    
        this.model.getNewest()
            .then(data => {
                this.view.renderNewest(data);
                console.log(this.model.newest);
            })
    }
}