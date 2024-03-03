import { readFileSync, createWriteStream } from 'fs';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

// Función para crear el grid de rectángulos y colorear los temas completos
function crearGrid(numTemas, lineas, progreso) {
    // Tamaño del canvas
    const width = 400;
    const height = 400;

    // Crear el canvas
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Calcular el número de rectángulos en el grid
    const totalRectangulos = lineas.length / 2;

    // Calcular el número de rectángulos completos
    const temasCompletos = Math.floor((numTemas / totalRectangulos) * totalRectangulos);

    // Ancho y alto de los rectángulos
    const rectWidth = width / 10;
    const rectHeight = height / 10;

    // Colorear los rectángulos completos
    ctx.fillStyle = 'green';
    for (let i = 0; i < temasCompletos; i++) {
        const row = Math.floor(i / 10);
        const col = i % 10;
        ctx.fillRect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    }

    // Guardar la imagen en un archivo
    const out = createWriteStream(path.join(process.cwd(), 'grid.png'));
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('La imagen se ha guardado correctamente.'));
}

function actualizarReadme(temasCompletos, temas, progreso) {
    const readmePath = path.join(process.cwd(), 'README.md');
    const readme = readFileSync(readmePath, 'utf8');
    const lineas = readme.split('\n');
    const progresoLinea = lineas.findIndex(linea => linea.trim().startsWith('## Progreso'));

    if (progresoLinea !== -1) {
        lineas[progresoLinea] = `## Progreso: ${progreso.toFixed(2)}%`;
    }

    const temasLinea = lineas.findIndex(linea => linea.trim().startsWith('De un total de'));
    if (temasLinea !== -1) {
        lineas[temasLinea] = `De un total de ${temas.length} temas, se han completado ${temasCompletos.length}. Esto representa un progreso del ${progreso.toFixed(2)}%.`;
    }

    const nuevoReadme = lineas.join('\n');
    createWriteStream(readmePath).write(nuevoReadme);
    console.log('El archivo README.md ha sido actualizado.');
}

try {
    const data = readFileSync('src/contenidos.txt', 'utf8');
    const temas = data.split('\n');
    const temasCompletos = temas.filter(tema => tema.trim().startsWith('X'));
    const progreso = (temasCompletos.length / temas.length) * 100;

    // Ejemplo de uso
    console.log('Temas completos:', temasCompletos);
    console.log('Temas:', temas);
    console.log('Progreso:', progreso.toFixed(2) + '%');

    crearGrid(temasCompletos.length, temas, progreso);
    actualizarReadme(temasCompletos, temas, progreso);
} catch (error) {
    console.error('Error al leer el archivo:', error);
}
