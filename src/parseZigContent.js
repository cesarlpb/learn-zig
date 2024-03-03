// https://ziglang.org/documentation/0.11.0/

// Contenido proporcionado
var contenido = document.getElementsByTagName("nav")[1].textContent

// Separar el contenido en líneas
var lineas = contenido.split('\n');

// Iterar sobre cada línea y limpiar los espacios innecesarios
var temas = [];
for (var i = 0; i < lineas.length; i++) {
    var tema = lineas[i].trim(); // Eliminar espacios al inicio y al final de la línea
    tema = tema.replace(/\s+/g, ' '); // Reemplazar múltiples espacios por uno solo
    if (tema !== '') { // Ignorar líneas vacías
        temas.push(tema);
    }
}

// Crear un string con cada tema en una línea
var temasString = temas.join('\n');
console.log(temasString);
