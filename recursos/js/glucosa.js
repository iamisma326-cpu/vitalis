const databaseAlimentos = [
    {
        nombre: "Pan Blanco", categoria: "Carbohidratos", ig: 75, clasificacion: "alto",
        intercambio: "Cambiar por Pan Integral de Centeno (IG: 50) o Tortilla de Linaza."
    },
    {
        nombre: "Sandía", categoria: "Frutas", ig: 72, clasificacion: "alto",
        intercambio: "Intercambiar por Fresas (IG: 25) o Manzana Verde (IG: 38)."
    },
    {
        nombre: "Arroz Blanco", categoria: "Carbohidratos", ig: 70, clasificacion: "alto",
        intercambio: "Optar por Arroz Integral (IG: 50) o Quinoa Cocida (IG: 35)."
    },
    {
        nombre: "Plátano Maduro", categoria: "Frutas", ig: 60, clasificacion: "medio",
        intercambio: "Consumir Plátano menos maduro (IG: 45) o controlar porción a la mitad."
    },
    {
        nombre: "Avena Instantánea", categoria: "Carbohidratos", ig: 65, clasificacion: "medio",
        intercambio: "Sustituir por Avena integral en hojuelas naturales crudas (IG: 50)."
    },
    {
        nombre: "Lentejas", categoria: "Legumbres", ig: 32, clasificacion: "bajo",
        intercambio: "Nivel Seguro. Excelente fuente de fibra de absorción lenta."
    },
    {
        nombre: "Espinaca", categoria: "Verduras", ig: 15, clasificacion: "bajo",
        intercambio: "Nivel Seguro. Libre consumo ideal para acompañar carbohidratos."
    },
    {
        nombre: "Manzana Verde", categoria: "Frutas", ig: 38, clasificacion: "bajo",
        intercambio: "Nivel Seguro. Fruta ideal para colaciones."
    }
];

function renderizarAlimentos(lista) {
    const grid = document.getElementById("resultsGrid");
    grid.innerHTML = "";
    if (lista.length === 0) {
        grid.innerHTML = "<p class='glucosa-sin-resultados'>No se encontraron alimentos que coincidan con los filtros.</p>";
        return;
    }
    lista.forEach(alimento => {
        const card = document.createElement("article");
        card.className = "food-card";

        let badgeClass = "ig-bajo";
        if (alimento.clasificacion === "medio") badgeClass = "ig-medio";
        if (alimento.clasificacion === "alto") badgeClass = "ig-alto";

        let htmlContenido = `<div class="food-title"><img src="../recursos/imagenes/iconos/arcilla/i-lemon-arcilla.svg" alt="" class="food-icon"> ${alimento.nombre}</div>
                            <div class="food-category">${alimento.categoria}</div>
                            <span class="ig-badge ${badgeClass}">Índice Glucémico: ${alimento.ig} (${alimento.clasificacion.toUpperCase()})</span>`;

        if (alimento.clasificacion === "medio" || alimento.clasificacion === "alto") {
            htmlContenido += `<div class="exchange-box">
                            <strong><img src="../recursos/imagenes/iconos/arcilla/i-info-circle-arcilla.svg" alt="" class="food-icon"> Sugerencia de Intercambio:</strong> ${alimento.intercambio}
                        </div>`;
        } else {
            htmlContenido += `<div class="safe-box">
                            <strong><img src="../recursos/imagenes/iconos/arcilla/i-check-circle-arcilla.svg" alt="" class="food-icon"> Control Óptimo:</strong> ${alimento.intercambio}
                        </div>`;
        }
        card.innerHTML = htmlContenido;
        grid.appendChild(card);
    });
}

function filtrarAlimentos() {
    const textoBusqueda = document.getElementById("searchInput").value.toLowerCase();
    const categoriaSeleccionada = document.getElementById("categorySelect").value;
    const alimentosFiltrados = databaseAlimentos.filter(alimento => {
        const coincideTexto = alimento.nombre.toLowerCase().includes(textoBusqueda);
        const coincideCategoria = (categoriaSeleccionada === "Todos" || alimento.categoria === categoriaSeleccionada);
        return coincideTexto && coincideCategoria;
    });
    renderizarAlimentos(alimentosFiltrados);
}

window.onload = function () {
    renderizarAlimentos(databaseAlimentos);
}
