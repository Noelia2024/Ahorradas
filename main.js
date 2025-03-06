/*document.addEventListener('DOMContentLoaded', () => {
  // Selecciona las secciones
  const $sectionBalance = document.getElementById("seccionBalance");
  const $sectionCategoria = document.getElementById("seccionCategorias");
  const $sectionReportes = document.getElementById("seccionReportes");

  // Función para mostrar un elemento
  const mostrarElemento = (selector) => {
    selector.classList.remove("hidden"); 
  };

  // Función para ocultar un elemento
  const ocultarElemento = (selector) => {
    selector.classList.add("hidden"); 
  };

  // Inicializamos, ocultamos todas las secciones y mostramos solo la de Balance
  ocultarElemento($sectionCategoria);
  ocultarElemento($sectionReportes);
  mostrarElemento($sectionBalance); 

  // Asignar eventos de clic a los botones
  document.getElementById("balance").addEventListener("click", () => {
    console.log("Clic en Balance");
    mostrarElemento($sectionBalance); 
    ocultarElemento($sectionCategoria);
    ocultarElemento($sectionReportes); 
  });

  document.getElementById("categoria").addEventListener("click", () => {
    console.log("Clic en Categorías");
    mostrarElemento($sectionCategoria); 
    ocultarElemento($sectionBalance); 
    ocultarElemento($sectionReportes); 
  });

  document.getElementById("reporte").addEventListener("click", () => {
    console.log("Clic en Reportes");
    mostrarElemento($sectionReportes); 
    ocultarElemento($sectionCategoria);
    ocultarElemento($sectionBalance); 
  });
});*/


//Selección de elementos del DOM

const elementos = {
  
    agregarCategoriaBtn: document.getElementById('agregar-categoria-btn'),
    nombreCategoriaInput: document.getElementById('nombre-categoria'),
    listaCategorias: document.getElementById('lista-categorias'),
    modalEditarCategoria: document.getElementById('modal-editar-categoria'),
    formularioEditarCategoria: document.getElementById('formulario-editar-categoria'),
    cancelarEditarCategoria: document.getElementById('cancelar-editar-categoria'),
    guardarEditarCategoria: document.getElementById('guardar-editar-categoria'),
    editarCategoriaId: document.getElementById('editar-categoria-id'),
    editarCategoriaNombre: document.getElementById('editar-categoria-nombre')
};



//------- Almacenar categorías---------
let categorias = [];

//------ Función para guardar categorías en localStorage----------
const guardarCategorias = () => {
    localStorage.setItem('categorias', JSON.stringify(categorias));
};

//------ Función para cargar categorías desde localStorage----------
const cargarCategorias = () => {
    const categoriasGuardadas = localStorage.getItem('categorias');
    if (categoriasGuardadas) {
        categorias = JSON.parse(categoriasGuardadas);
        renderizarCategorias();
    }
};

//---------- Función para renderizar categorías-------------
const renderizarCategorias = () => {
    elementos.listaCategorias.innerHTML = '';

    categorias.forEach(categoria => {
        const nuevaCategoriaDiv = document.createElement('div');
        nuevaCategoriaDiv.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'border-b', 'border-gray-200');
        nuevaCategoriaDiv.innerHTML = `
            <span>${categoria.nombre}</span>
            <div class="flex space-x-2">
                <button class="editar-categoria-btn text-red-500 hover:text-black font-bold py-1 px-2 rounded bg-white cursor-pointer" data-id="${categoria.id}">Editar</button>
                <button class="eliminar-categoria-btn text-red-500 hover:text-black font-bold py-1 px-2 rounded bg-white cursor-pointer" data-id="${categoria.id}">Eliminar</button>
            </div>
        `;
        elementos.listaCategorias.appendChild(nuevaCategoriaDiv);
    });

    // Asignar eventos a los botones de editar y eliminar
    document.querySelectorAll('.editar-categoria-btn').forEach(boton => {
        boton.addEventListener('click', () => editarCategoria(boton.dataset.id));
    });
    document.querySelectorAll('.eliminar-categoria-btn').forEach(boton => {
        boton.addEventListener('click', () => eliminarCategoria(boton.dataset.id));
    });
};

//---------- Función para agregar nueva categoría------------
const agregarCategoria = (evento) => {
    evento.preventDefault();

    const nuevaCategoria = {
        id: Date.now(),
        nombre: elementos.nombreCategoriaInput.value
    };

    categorias.push(nuevaCategoria);
    guardarCategorias();
    renderizarCategorias();
    elementos.nombreCategoriaInput.value = '';
};

//--------- Función para editar una categoría--------------
const editarCategoria = (id) => {
    const categoria = categorias.find(cat => cat.id == id);
    elementos.editarCategoriaId.value = categoria.id;
    elementos.editarCategoriaNombre.value = categoria.nombre;

    elementos.modalEditarCategoria.classList.remove('hidden');
    document.getElementById('contenido-principal').classList.add('hidden');
};

//------------Función para guardar cambios de edición de categoría----------------
const guardarEditarCategoria = (evento) => {
    evento.preventDefault();

    const id = elementos.editarCategoriaId.value;
    const categoria = categorias.find(cat => cat.id == id);
    categoria.nombre = elementos.editarCategoriaNombre.value;

    guardarCategorias();
    renderizarCategorias();
    elementos.modalEditarCategoria.classList.add('hidden');
    document.getElementById('contenido-principal').classList.remove('hidden');
};

//------------------ Función para eliminar una categoría------------------
const eliminarCategoria = (id) => {
    categorias = categorias.filter(cat => cat.id != id);
    guardarCategorias();
    renderizarCategorias();
};

//-------------------- Asignar eventos a los botones-------------------
elementos.agregarCategoriaBtn.addEventListener('click', agregarCategoria);
elementos.cancelarEditarCategoria.addEventListener('click', () => {
    elementos.modalEditarCategoria.classList.add('hidden');
    document.getElementById('contenido-principal').classList.remove('hidden');
});
elementos.formularioEditarCategoria.addEventListener('submit', guardarEditarCategoria);

//--------- Inicializar categorías al cargar la página-----------------
document.addEventListener('DOMContentLoaded', cargarCategorias, mostrarEstilos);
