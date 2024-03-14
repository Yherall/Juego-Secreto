let numeroSecreto = 0; //Se genera variable para guardar la funcion generarNumeroSecreto
let intentos = 0; //Variable que se encarga de contabilizar los intentos del usuario
let listaNumerosSorteados = []; //Lista Array para  almacenar los numeros que el computador ha sorteado
let numeroMaximo = 10; //Genera un rango maximo de numeros a ser elegidos por el computador.
let intentosMaximos = 3; //Variable  que indica cuantos intentos máximos puede tener el jugador en este juego.

//Funcion para identificar elemento y cambiar el texto del elemento
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

//Funcion que verifica que numero de usuario sea mayor o menor al numero aleatorio
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //Toma el string del input valorUsuario y lo convierte a numero entero //.VALUE recupera el valor actual del input

    if (intentos <= intentosMaximos){ //compara si la variable intentos es igual a la variable intentos Maximos
        console.log(intentos);
        
        if (numeroDeUsuario === numeroSecreto) { //Si el numero del usuario es igual al valor aleatorio
            asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`); //Se utiliza operador ternario para resumir un IF
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            //El usuario no acertó.
            if (numeroDeUsuario > numeroSecreto) { //Si el numero del usuario es mayor a numero secreto
                asignarTextoElemento('p','El número secreto es menor');
            } else { //Si NO el numero del usuario es menor a numero secreto
                asignarTextoElemento('p','El número secreto es mayor');
            }
            intentos++; //Se incrementa el numero de intentos
            limpiarCaja(); //Se llama a la funcion
        }
    } else{
        asignarTextoElemento('p',`Llegaste a la cantidad maxima de intentos que es ${intentosMaximos}. Inicia nuevo juego`);
        document.getElementById('reiniciar').removeAttribute('disabled'); 
    }
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = ''; //A traves de esta funcion  se vacia la caja de texto introducciendo un espacio
}

function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numeroMaximo)+1; //Esta funcion genera un numero aleatorio  entre 1 y el numero máximo definido +1 ya que no existe el intento 0

    console.log(numeroGenerado); //Para moostrar el numero Aleatorio en la consola
    console.log(listaNumerosSorteados); //para mostrar la lista en la consola
    
    //Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo) { //Si el tamaño de la lista es igual al numero maximo...
        asignarTextoElemento('p','Ya se sortearon todos los números posibles, actualiza la pagina');
        document.querySelector('#valorUsuario').setAttribute('disabled','true');
        document.querySelector('#intentar').setAttribute('disabled','true');
    } else {
        //Si el numero generado está incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)) { //chequea si numero Aleatorio esta en la lista
            return generarNumeroSecreto(); //Inicia la funcion nuevamente
        } else {
            listaNumerosSorteados.push(numeroGenerado); //Si el numero aleatorio no esta en la lista, se guarda en ella
            return numeroGenerado; //Volvemos a la variable para generar un nuevo numero aleatorio
        }
    }
}

function condicionesIniciales() { //Funcion que ejecuta al cargar la página para  inicializar las variables y elementos en 0
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
    console.log(numeroSecreto);
}

function reiniciarJuego() { //Funcion  que Reinicia todo el juego 
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}

condicionesIniciales(); //Se llama a la funcion  para que inicie el juego