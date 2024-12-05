//Comentarios
//Variable es un dato que se debe definir, se necesita para que la computadora le haga un pequeño espacio en la memoria. Antes se definian con la palabra var.

//let nombre = "laura";
//console.log(nombre);

//Hola mundo
//console.log("Hola mundo desde la consola");
//alert("Hola mundo desde un alert");

//Tipo de dato
//string
//let texto = "Soy un texto";
// number
//let numero = 42; 
// boolean 2 datos, ejemplo true or false
//let verdadero = true; 
//undefined 
//let undefined;
//nulo o null let vacio = null;   Backtick : `
//Defirnir mis constantes y mis variables

const fecha = document.querySelector('#fecha');
const lista = document.querySelector('#lista');
const elemento = document.querySelector('#elemento');
const input = document.querySelector('#input');
const botonAgregar = document.querySelector('#botonAgregar');
const check = 'bi-check-circle-fill';
const tachado = 'tachado';
const uncheck = 'bi-circle';
let LIST;
let id;

const FECHA = new Date ();
fecha.innerHTML = FECHA.toLocaleDateString('es-MX',{
    weekday:'long',
    month: 'long',
    day: 'numeric',
});

function agregarTarea(tarea,id,hecho,eliminar) {
    if (eliminar) {
        return
    }
    const realizado = hecho ? check : uncheck;
    const LINE = hecho ? tachado : '';
    const elemento = `<li id="elemento">
    <i id="${id}" data="hecho" class="bi ${realizado}"></i>
    <p class="tarea-lista ${LINE}">${tarea}</p>
    <i id="${id}" data="eliminar" class="bi bi-trash3-fill"></i>
</li>`
lista.insertAdjacentHTML("beforeend",elemento);
};

function tareaRealizada(element) {
    element.classlist.toggle(check);
    element.classlist.toggle(uncheck);
    element.parentNode.querySelector('.text').classlist.toggle(tachado);
    LIST[element.id].realizado = LIST[element.id].realizado ? false :true;
}

function tareaEliminada(element) {
    element.prentNode.removeChild(element.parentNode);
    LIST[element.id].eliminar = true; 
};

botonAgregar.addEventListener("click", () => {
    const tarea = input.value;
    if (tarea) {
        agregarTarea(tarea, id, false, false)
        LIST.push({
            nombre: tarea,
            id: id,
            hecho: false,
            eliminar: false,
        });
        localStorage.setItem("TODO", JSON.stringify(LIST));
        id++;
        input.value = "";
    }
});

lista.addEventListener("click", function (event){
    const element = event.target;
    const elementData = element.attributes.data.value;
    if (elementData == "hecho") {
        tareaRealizada(element);
    } else if (elementData == "eliminar")
    {
        tareaEliminada(element);
    };
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
    LIST = JASON.parse(data);
    id = LIST.length;
    cargarLista(LIST);
} else {
    LIST = [];
    id = 0;
};
function cargarLista(array) {
    array.forEach(
        function (item) {
            agregarTarea(item.nombre, item.id, item.hecho, item.eliminar);
        }

    );
};