// Variables de conexión con la API de Mistral AI
var MISTRAL_API_KEY = "DhvEQO2dvAPbYnlPjgIHNSFEeHTrL18X";
var MISTRAL_URL = "https://api.mistral.ai/v1/chat/completions";
var MODELO = "mistral-small-latest";

// Recoge todos los datos del formulario y construye el prompt para la IA
function construirPrompt() {
    // Obtiene el formulario para acceder a sus campos
    var formulario = document.getElementById("demo-form");

    // Crea un array vacío para los alimentos marcados en los checkboxes
    var alimentos = [];
    // Busca todos los checkboxes con name="alimentos" que estén marcados
    var casillas = formulario.querySelectorAll('input[name="alimentos"]:checked');
    // Recorre cada checkbox marcado y guarda su valor en el array
    for (var i = 0; i < casillas.length; i++) alimentos.push(casillas[i].value);

    // Convierte los alimentos seleccionados en un texto separado por comas
    var listaAlimentos = alimentos.join(", ");
    // Si el usuario no marcó ningún alimento, se asigna un texto por defecto
    if (listaAlimentos == "") {
        listaAlimentos = "sin preferencias marcadas";
    }

    // Construye el texto que se enviará a la IA con todas las respuestas del usuario
    return "Diseña un menú de UN día (" + formulario.comidas.selectedOptions[0].text + ") para una persona con estas respuestas:\n" +
           "- Tipo de diabetes: " + formulario.diabetes.selectedOptions[0].text + "\n" +
           "- Objetivo principal: " + formulario.objetivo.selectedOptions[0].text + "\n" +
           "- Nivel de actividad física: " + formulario.actividad.selectedOptions[0].text + "\n" +
           "- Restricción alimentaria: " + formulario.restriccion.selectedOptions[0].text + "\n" +
           "- Alimentos que prefiere: " + listaAlimentos + "\n\n" +
           "Respeta la restricción y las preferencias. Incluye nombres, horarios aproximados, descripción del plato, carbohidratos e índice glucémico estimado.";
}

// Actualiza el conector visual: tipo puede ser "cargando", "error" o "listo"
function estado(tipo, texto, subtexto) {
    // Obtiene el elemento del conector para modificar su apariencia
    var conector = document.getElementById("ia-conector");

    // Limpia cualquier estado anterior para empezar desde cero
    conector.classList.remove("cargando", "error");
    // Si el estado no es "listo", agrega la clase CSS correspondiente
    if (tipo != "listo") {
        conector.classList.add(tipo);
    }

    // Si el estado es "listo" muestra el textarea, si no lo oculta
    if (tipo == "listo") {
        document.getElementById("ia-resultado").hidden = false;
    } else {
        document.getElementById("ia-resultado").hidden = true;
    }

    // Actualiza el texto principal y el subtexto del conector
    conector.querySelector(".conector-texto").textContent = texto;
    conector.querySelector(".conector-subtexto").textContent = subtexto;
}

// Función principal: llama a la API de Mistral y muestra el menú generado por la IA
async function generarMenu(evento) {
    // Evita que el formulario se envíe y recargue la página
    evento.preventDefault();
    // Obtiene el formulario para leer los datos que ingresó el usuario
    var formulario = document.getElementById("demo-form");

    // Verifica que todos los campos requeridos estén completos
    if (!formulario.reportValidity()) return;

    // Guarda una referencia al botón Generar Menú IA
    var boton = document.getElementById("ia-generar");
    // Abre el details para que el conector y el resultado sean visibles
    document.getElementById("demo-details").open = true;
    // Deshabilita visualmente el botón mientras se procesa la solicitud
    boton.classList.add("boton-cargando");
    // Muestra el estado inicial de "cargando" en el conector
    estado("cargando", "IA Mistral Procesando…", "Analizando tus variables");

    try {
        // Hace la petición HTTP a la API de Mistral con los datos del formulario
        var respuesta = await fetch(MISTRAL_URL, {
            method: "POST",
            // Incluye la API key en el encabezado de autorización
            headers: { "Content-Type": "application/json", "Authorization": "Bearer " + MISTRAL_API_KEY },
            // Convierte los datos a JSON para enviarlos en el cuerpo de la petición
            body: JSON.stringify({
                model: MODELO,
                messages: [
                    // Mensaje del sistema: define el rol y las reglas de comportamiento de la IA
                    { role: "system", content: "Eres un nutricionista experto en diabetes. Diseñas menús diarios de bajo índice glucémico. Responde SIEMPRE en español. Escribe en texto plano, sin formato Markdown: no uses asteriscos (**), almohadillas (###), guiones bajos ni ningún símbolo de formato. Usa solo texto corrido, mayúsculas y saltos de línea para estructurar." },
                    // Mensaje del usuario: el prompt con los datos ingresados en el formulario
                    { role: "user", content: construirPrompt() }
                ],
                temperature: 0.6,         // Controla la creatividad de la respuesta (0 = precisa, 1 = creativa)
                max_tokens: 1200             // Número máximo de palabras que puede generar la IA
            })
        });

        // Si el servidor devuelve un error HTTP, lo lanza como excepción
        if (!respuesta.ok) {
            throw new Error("HTTP " + respuesta.status + ": " + await respuesta.text());
        }

        // Convierte la respuesta de la API de JSON a un objeto de JavaScript
        var datos = await respuesta.json();
        var menu = "";
        // Verifica que la respuesta tenga la estructura esperada
        if (datos.choices && datos.choices[0] && datos.choices[0].message) {
            menu = datos.choices[0].message.content;
        } else {
            throw new Error("Respuesta vacía de la IA");
        }

        // Coloca el menú generado dentro del textarea para que el usuario lo vea
        document.getElementById("ia-texto-menu").value = menu;
        // Cambia el conector al estado "listo" con un mensaje de éxito
        estado("listo", "Menú generado por IA Mistral", "Personalizado con tus respuestas");
    } catch (error) {
        // Si ocurre cualquier error, lo muestra en la consola del navegador
        console.error("[demo IA] Error:", error);
        // Muestra el estado de error en el conector con un mensaje amigable
        estado("error", "No se pudo generar el menú", "Revisa tu conexión o inténtalo de nuevo (ver consola).");
    } finally {
        // Siempre reactiva el botón, tanto si falló como si funcionó
        boton.classList.remove("boton-cargando");
    }
}

// Al cargar la página, asigna la función generarMenu al click del botón
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("ia-generar").addEventListener("click", generarMenu);
});