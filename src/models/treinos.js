import CronometerModel from '../models/cronometer.js';
import CronometerView from '../views/cronometer.js';
import CronometerController from '../controllers/cronometer.js';
import TemposModel from '../models/tempos.js';
import TemposView from '../views/tempos.js';
import TemposController from '../controllers/tempos.js';


export default class TreinosModel {

    constructor() {
        this.treinos = [];
        this.newest = {};
    }

    getTreinos = async () => {

        let result = axios.get('http://localhost:3000/treinos')
            .then((response) => {
                let treinos = response.data;
                this.treinos = treinos;
                return treinos;
            })

        return await result;
    }

    getNewest = async () => {
        let result = axios.get('http://localhost:3000/treinos/newest')
            .then((response) => {
                let newest = response.data[0];
                this.newest = newest;
                this.newest.tempos = new TemposController(new TemposModel(this.newest._id), new TemposView());
                return newest;
            })

        return await result;
    }

}
