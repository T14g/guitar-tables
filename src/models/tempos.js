export default class TemposModel {

    constructor() {
        this.tempos = [];
    }

    totalTime = (data) => {
        let tempos = {};

        if (data.length > 0) {
            data.map(item => {
                if (!(item.titulo in tempos)) {
                    tempos[item.titulo] = item.tempo;
                } else {
                    tempos[item.titulo] = this.sumTwoTimers(tempos[item.titulo], item.tempo);
                }
            })
        }

        let keys = Object.keys(tempos);
        let results = [];

        keys.map(key => {
            let obj = { titulo: key, tempo: tempos[key] };
            results.push(obj);
        });

        return results;

    }

    //Soma o tempo em h,m,s e retorna uma string do tempo
    sumTwoTimers = (initial, summ) => {

        const initialSplit = initial.split(':');
        const summSplit = summ.split(':');
        let h, m, s, result;

        h = parseInt(initialSplit[0]) + parseInt(summSplit[0]);
        m = parseInt(initialSplit[1]) + parseInt(summSplit[1]);
        s = parseInt(initialSplit[2]) + parseInt(summSplit[2]);

        while (s >= 60) {
            m += 1;
            s -= 60;
        }

        while (m >= 60) {
            h += 1;
            m -= 60;
        }

        //Transforma em strings com extra 0's quando necessário
        h = this.extraZero(h);
        m = this.extraZero(m);
        s = this.extraZero(s);

        result = `${h}:${m}:${s}`;
        return result;
    }

    //Adiciona zeros caso haja apenas um dígito e retorna em string
    extraZero = (number) => {

        let numberStr = number.toString();

        if (numberStr.length === 1) {
            numberStr = '0' + numberStr;
        }

        return numberStr;
    }

    //Retorna a soma de todos os tempos
    sumAllTimers = (data) => {
        let timers = this.totalTime(data);
        let result = "00:00:00";

        if (timers.length > 0) {
            timers.map(item => {
                result = this.sumTwoTimers(result, item.tempo);
            })
        }

        return result;
    }

    getTempos = async (id) => {

        const result = axios.get('http://localhost:3000/tempos/' + id)
            .then((response) => {
                this.tempos = response.data;

                return response.data;
            })

        return result;
    }

    //Retorna um Objeto com os tempos totais de cada tipo
    totalTime = (data) => {
        let tempos = {};

        if (data.length > 0) {
            data.map(item => {
                if (!(item.titulo in tempos)) {
                    tempos[item.titulo] = item.tempo;
                } else {
                    tempos[item.titulo] = this.sumTwoTimers(tempos[item.titulo], item.tempo);
                }
            })
        }

        let keys = Object.keys(tempos);
        let results = [];

        keys.map(key => {
            let obj = { titulo: key, tempo: tempos[key] };
            results.push(obj);
        });

        return results;

    }

    //Soma o tempo em h,m,s e retorna uma string do tempo
    sumTwoTimers = (initial, summ) => {

        const initialSplit = initial.split(':');
        const summSplit = summ.split(':');
        let h, m, s, result;

        h = parseInt(initialSplit[0]) + parseInt(summSplit[0]);
        m = parseInt(initialSplit[1]) + parseInt(summSplit[1]);
        s = parseInt(initialSplit[2]) + parseInt(summSplit[2]);

        while (s >= 60) {
            m += 1;
            s -= 60;
        }

        while (m >= 60) {
            h += 1;
            m -= 60;
        }

        //Transforma em strings com extra 0's quando necessário
        h = this.extraZero(h);
        m = this.extraZero(m);
        s = this.extraZero(s);

        result = `${h}:${m}:${s}`;
        return result;
    }

    //Adiciona zeros caso haja apenas um dígito e retorna em string
    extraZero = (number) => {

        let numberStr = number.toString();

        if (numberStr.length === 1) {
            numberStr = '0' + numberStr;
        }

        return numberStr;
    }

    //Retorna a soma de todos os tempos
    sumAllTimers = (data) => {
        let timers = this.totalTime(data);
        let result = "00:00:00";

        console.log(data);

        if(timers.length > 0){
            timers.map(item => {
                result = this.sumTwoTimers(result, item.tempo);
            })
        }
        
        return result;
    }

    getAllTempos = async () => {

        const result = axios.get('http://localhost:3000/tempos/')
            .then((data) => {
                const tempoTotal = this.sumAllTimers(data);
                const tempoParts = tempoTotal.split(':');
                return tempoParts;
            })

        return result;

    }
}