// https://codeberg.org/ziglings/exercises/src/branch/main/exercises

let trs = document.getElementsByTagName("tr");
let resultString = ""; // Aquí almacenaremos el resultado

for (const item of trs) {
    let tds = item.textContent.split("\n");
    for (const td of tds) {
        if (/^\d{3}_.*\.zig$/.test(td.trim())) {
            // Eliminar espacios innecesarios y agregar al resultado
            resultString += td.trim() + '\n';
        }
    }
}

console.log(resultString); // Imprimir el resultado
