const createChord = async (name, images) => {

    let data = { name: name , images: images};
    await fetch('http://localhost:3000/acordes',{
        method: "POST",
        body: JSON.stringify(data),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    }).then(result =>{
        console.log(result);
    })
    
}


export { createChord }