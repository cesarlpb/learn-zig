// https://doc.rust-lang.org/book/

function imprimirContenidoOL(elementoOL) {
  // Obtener todos los elementos hijos del elementoOL
  const hijos = elementoOL.children;
  let contenidos = "";

  // Iterar sobre los elementos hijos
  for (let i = 0; i < hijos.length; i++) {
      const hijo = hijos[i];
      // Verificar si el hijo es un elemento <li>
      if (hijo.tagName.toLowerCase() === 'li') {
         contenidos += hijo.textContent + "\n";
      }
      // Verificar si el hijo es un elemento <ol>
      if (hijo.tagName.toLowerCase() === 'ol') {
          // Si es un <ol>, llamar recursivamente a la función para iterar sobre sus elementos
          imprimirContenidoOL(hijo);
      }
  }
  return contenidos;
}

// Obtener la lista ordenada (ol) por su ID, supongamos que tiene el ID "listaContenidos"
const listaOL = document.getElementsByTagName('ol')[0];

// Llamar a la función para imprimir el contenido de la lista ordenada
let contenidos = imprimirContenidoOL(listaOL);

console.log(contenidos);
