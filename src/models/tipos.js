export default class TiposModel {

    constructor() {
        this.tipos = [];
    }

    getTipos = async (id) => {
        const result = axios.get('http://localhost:3000/tipo/')
            .then((response) => {
                this.tipos = response.data;
                return response.data;
            })

        return result;
    }
}