export default class TreinosModel {

    constructor() {
        this.treinos = [];
        this.tempos = null;
        this.newest = null;
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
                return newest;
            })

        return await result;
    }

    getTreino = async (id) => {
        let result = axios.get('http://localhost:3000/treino/' + id)
            .then((response) => {
                return response.data;
            })

        return result;
    }

    saveTreino = async ({ name, json }) => {
        axios.post('http://localhost:3000/treino', {
            name: name,
            json: json
        })
    }

    deleteTreino = async (id) => {
        let result = axios.delete('http://localhost:3000/treino/' + id)
            .then((response) => {
                return response.data;
            })

        return result;
    }

}
