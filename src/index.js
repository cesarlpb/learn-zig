import { readFileSync, createWriteStream } from 'fs';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';

function crearGrid(numCompletados, total, tipo) {
    const width = 400;
    const height = 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const totalRectangulos = total.length / 2;
    const completados = Math.floor((numCompletados / totalRectangulos) * totalRectangulos);

    const rectWidth = width / 10;
    const rectHeight = height / 10;

    ctx.fillStyle = 'green';
    for (let i = 0; i < completados; i++) {
        const row = Math.floor(i / 10);
        const col = i % 10;
        ctx.fillRect(col * rectWidth, row * rectHeight, rectWidth, rectHeight);
    }

    const filename = tipo === "ejercicios" ? 'grid2.png' : 'grid.png';
    const out = createWriteStream(path.join(process.cwd(), filename));
    const stream = canvas.createPNGStream();
    stream.pipe(out);
    out.on('finish', () => console.log('La imagen se ha guardado correctamente.'));
}

function actualizarReadme(numCompletados, total, progreso, tipo) {
    const readmePath = path.join(process.cwd(), 'README.md');
    const readme = readFileSync(readmePath, 'utf8');
    const lineas = readme.split('\n');
    let progresoLinea = -1;

    if (tipo === "ejercicios") {
        progresoLinea = lineas.findIndex(linea => linea.trim().startsWith('## Progreso ejercicios'));
    } else {
        progresoLinea = lineas.findIndex(linea => linea.trim().startsWith('## Progreso contenidos'));
    }

    if (progresoLinea !== -1) {
        lineas[progresoLinea] = `## Progreso${tipo === "ejercicios" ? " ejercicios" : " contenidos"}: ${progreso.toFixed(2)}%`;
    }

    const totalText = tipo === "ejercicios" ? "ejercicios" : "temas";
    const completadosText = tipo === "ejercicios" ? "ejerciciosCompletos" : "temasCompletos";

    const temasLinea = lineas.findIndex(linea => linea.trim().startsWith(`De un total de xx ${totalText}`));
    if (temasLinea !== -1) {
        lineas[temasLinea] = `De un total de ${total.length} ${totalText}, se han completado ${numCompletados.length}. Esto representa un progreso del ${progreso.toFixed(2)}% en los ${totalText}.`;
    }

    const nuevoReadme = lineas.join('\n');
    createWriteStream(readmePath).write(nuevoReadme);
    console.log('El archivo README.md ha sido actualizado.');
}

try {
    const temas = readFileSync('src/contenidos.txt', 'utf8').split('\n');
    const temasCompletos = temas.filter(tema => tema.trim().startsWith('X'));
    const progresoTemas = (temasCompletos.length / temas.length) * 100;

    const ejercicios = readFileSync('src/ejercicios.txt', 'utf8').split('\n');
    const ejerciciosCompletos = ejercicios.filter(ex => ex.trim().startsWith('X'));
    const progresoEjercicios = (ejerciciosCompletos.length / ejercicios.length) * 100;

    console.log('Progreso temas:', progresoTemas.toFixed(2) + '%');
    console.log('Progreso ejercicios:', progresoEjercicios.toFixed(2) + '%');

    crearGrid(temasCompletos.length, temas, progresoTemas, "");
    actualizarReadme(temasCompletos, temas, progresoTemas, "");

    crearGrid(ejerciciosCompletos.length, ejercicios, progresoEjercicios, "ejercicios");
    actualizarReadme(ejerciciosCompletos, ejercicios, progresoEjercicios, "ejercicios");
} catch (error) {
    console.error('Error al leer el archivo:', error);
}
