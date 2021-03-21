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

    newTipo = async (category, name) => {

        let result = axios.post('http://localhost:3000/tipo', {
            name: name,
            category: category
        }).then((result) => {
            return result;
        })

        return result;
        
    }
}