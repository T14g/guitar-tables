export default class TemposModel {

    constructor() {

    }

    getTempos = async (id) => {
        const result = axios.get('http://localhost:3000/tempos/' + id)
            .then((response) => {
                return response.data;

            })

        return result;
    }
}