//Encontra o maior index se existir de um elemento com index
function biggestIndex(){
    let elements = document.querySelectorAll('[data-index]');
    let maior = 0;
    
    if(elements.length > 0){

        let array = [...elements];

        array.map(el=> {
            if(parseInt(el.dataset.index) > maior){
                maior = parseInt(el.dataset.index);
            }
        })
    }

    return maior;
}

export { biggestIndex};