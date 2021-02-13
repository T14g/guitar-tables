//Chronometer stuff
const   crDisplay = document.querySelector('.cr-display'),
        startBtn = document.querySelector('#start-cr'),
        stopBtn = document.querySelector('#stop-cr'),
        clearBtn = document.querySelector('#clear-cr'),
        closeBtn = document.querySelector('#close-cr');

let  timeWorker = null; // initialize variable

//Exibe o cronômetro para determinada atividade do treino
function displayCronometer(id, name) {
    
    stopTimer();

    document.querySelector('#cr-time').value = "00:00:00"

    document.querySelector('#btn-salvar').dataset.id_table = id;
    document.querySelector('#chronometer').style.display = 'block';
    document.querySelector('.cr-title').innerHTML = name;

}

//Adiciona a exibição do crônometro no elemento
function chronometerHandlers() {
    const elements = document.querySelectorAll('.watch-container');
    console.log(elements);

    [...elements].map(el =>{
        el.onclick = (e) => {
            let _name = e.target.dataset.nomeItem;
            let _id  = e.target.dataset.tableId;
            displayCronometer(_id, _name);
        }
    })
    
    //Previne o evento de disparar ao click em inner element
    const innerEls = document.querySelectorAll('.stop-watch-el');

    [...innerEls].map(el => {
        el.onclick = (e) => {
            e.stopPropagation();
            e.target.parentElement.click();
        }
    })
 
}


document.querySelector('#cr-time').addEventListener('click',function(e){
    document.querySelector('#cr-time').value = prompt("Digite o tempo no formato xx:xx:xx");
});

//Torna o cronômetro móvel

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

closeBtn.onclick = function() {
    stopTimer();
    document.querySelector('#cr-time').value = "00:00:00";
    document.querySelector('#chronometer').style.display = 'none';
}


// Inicializa o timer
function startTimer()
{
   // First check whether Web Workers are supported
   if (typeof(Worker)!=="undefined"){
      // Check whether Web Worker has been created. If not, create a new Web Worker based on the Javascript file simple-timer.js
      if (timeWorker==null){
         timeWorker = new Worker("./workers/timeWorker.js");
      }
      // Update timer div with output from Web Worker
      timeWorker.onmessage = function (event) {
        document.querySelector('#cr-time').value = event.data;
      };
   } else {
      // Web workers are not supported by your browser
      document.querySelector('#cr-time').value = "Error"
   }

 
}


//Stop no timer
function stopTimer() {
    if(timeWorker){
        timeWorker.terminate();
        timeWorker = null;
    }
}


/* Start button */
startBtn.onclick = startTimer;

/* Stop button */
stopBtn.onclick = function() {
    stopTimer();
}

/* Clear button */
clearBtn.onclick = function() {
    document.querySelector('#cr-time').value = "00:00:00";

    stopTimer();
    //Restart if already started
    if(timeWorker){
        startTimer();
    }
    
}


//Salva um registro de tempo

function saveTime(e){
    const id_table = e.target.dataset.id_table;
    const titulo = document.querySelector('.cr-title').innerHTML;
    const tempo = document.querySelector('#cr-time').value;

    let data = {
        titulo: titulo,
        table_id : id_table,
        tempo : tempo
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
        clearBtn.click();
        closeBtn.click();
    })     
    .catch(err => console.log('Request Failed', err)); 
}


//Handler do botão salvar

document.querySelector('#btn-salvar').addEventListener('click', function(e){
    saveTime(e);
})

export { chronometerHandlers };