//Exibe o cronômetro para determinada atividade do treino
function displayCronometer(id, name) {
    
    clearTimeout(t);
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;

    document.querySelector('#btn-salvar').dataset.id_table = id;
    document.querySelector('#chronometer').style.display = 'block';
    document.querySelector('.cr-title').innerHTML = name;

}

dragElement(document.getElementById("chronometer"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


//Chronometer stuff
var crDisplay = document.querySelector('.cr-display'),
    startBtn = document.querySelector('#start-cr'),
    stopBtn = document.querySelector('#stop-cr'),
    clearBtn = document.querySelector('#clear-cr'),
    closeBtn = document.querySelector('#close-cr'),
    seconds = 0, minutes = 0, hours = 0,
    t;

closeBtn.onclick = function() {
    clearTimeout(t);
    console.log("fechar");
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
    document.querySelector('#chronometer').style.display = 'none';
}

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }
    
    crDisplay.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}


/* Start button */
startBtn.onclick = timer;

/* Stop button */
stopBtn.onclick = function() {
    clearTimeout(t);
}

/* Clear button */
clearBtn.onclick = function() {
    crDisplay.textContent = "00:00:00";
    seconds = 0; minutes = 0; hours = 0;
}


//Salva um registro de tempo

function saveTime(e){
    const id_table = e.target.dataset.id_table;
    const titulo = document.querySelector('.cr-title').innerHTML;

    let data = {
        titulo: titulo,
        table_id : id_table,
        tempo : crDisplay.textContent
    }

    fetch('http://localhost:3000/tempos',{
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(data)
    }) 
    // Handle success
    .then(response => response.json()) 
    .then(data =>{  
        console.log(data);
    })     
    .catch(err => console.log('Request Failed', err)); 
}


//Handler do botão salvar

document.querySelector('#btn-salvar').addEventListener('click', function(e){
    clearTimeout(t);
    saveTime(e);
})