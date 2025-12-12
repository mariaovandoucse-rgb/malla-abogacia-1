// Lista de ramos + requisitos
const courses = {
    "Introducción al Derecho": ["Obligaciones", "Derecho Constitucional", "Introducción a las Ciencias Políticas"],
    "Derecho civil: Parte General": ["Obligaciones", "Responsabilidad Civil y Comercial"],
    "Derecho Romano": [],
    "Filosofía": [],
    "Historia del Pensamiento jurídico y político": ["Introducción a las Ciencias Políticas"],
    "Introducción a la economía": ["Finanzas y Derecho Tributario"],
    "Teología": ["Doctrina Social de la Iglesia"],

    "Obligaciones": ["Sociedad y Títulos de Créditos"],
    "Responsabilidad Civil y Comercial": ["Practica 1", "Derecho de Familia"],
    "Derecho Penal: Parte General": ["Derecho Penal Parte Especial"],
    "Introducción a las Ciencias Políticas": [],
    "Derecho Constitucional": ["Derecho Procesal Civil"],
    "Finanzas y Derecho Tributario": [],
    "Sociología Jurídica": ["Metodología de la investigación en Cs. Jurídicas"],
    "Doctrina Social de la Iglesia": [],

    "Derechos Humanos": [],
    "Contratos Parte General": ["Contratos en Particular", "Derecho de los Recursos Naturales y Medioambiente"],
    "Contratos en Particular": ["Derechos Reales", "Derecho Administrativo", "Derecho Concursal"],
    "Sociedad y Títulos de Créditos": ["Derecho Concursal"],
    "Derecho Penal Parte Especial": ["Derecho Procesal Penal"],
    "Derecho Procesal Civil": ["Medios Participativos de Resolución de Conflictos"],
    "Metodología de la investigación en Cs. Jurídicas": [],
    "Practica 1": [],

    "Derechos Reales": ["Filosofía del Derecho", "Derecho Internacional Privado"],
    "Derecho Procesal Penal": [],
    "Derecho Administrativo": [],
    "Derecho del Trabajo": [],
    "Derecho de la Seguridad Social": [],
    "Derecho de los Recursos Naturales y Medioambiente": [],
    "Medios Participativos de Resolución de Conflictos": ["Derecho Internacional Público", "Seminario de Ética y Profesión", "Practica 2"],
    "Derecho de Familia": ["Derecho Internacional Privado", "Derecho Sucesorio"],
    "Optativa 1": [],

    "Derecho Sucesorio": [],
    "Derecho Concursal": [],
    "Derecho Internacional Privado": [],
    "Filosofía del Derecho": [],
    "Practica 2": [],
    "Seminario de Ética y Profesión": [],
    "Derecho Internacional Público": [],
    "Optativa 2": []
};

// Estado inicial
let completed = new Set();

// Crear malla
const grid = document.getElementById("grid");

Object.keys(courses).forEach(course => {
    const div = document.createElement("div");
    div.className = "course locked";
    div.innerText = course;
    div.dataset.course = course;
    grid.appendChild(div);
});

function updateAvailability() {
    document.querySelectorAll(".course").forEach(div => {
        const course = div.dataset.course;

        // si ya está completado
        if (completed.has(course)) {
            div.className = "course completed";
            return;
        }

        // verificar si todos sus requisitos están aprobados
        const needed = Object.entries(courses)
            .filter(([_, opens]) => opens.includes(course))
            .map(([req]) => req);

        const allOpen = needed.every(req => completed.has(req));

        div.className = allOpen ? "course available" : "course locked";
    });
}

// Click para aprobar / desaprobar
grid.addEventListener("click", e => {
    if (!e.target.classList.contains("course")) return;

    const course = e.target.dataset.course;

    if (e.target.classList.contains("locked")) return;

    if (completed.has(course)) {
        completed.delete(course);
    } else {
        completed.add(course);
    }

    updateAvailability();
});

// Inicial
updateAvailability();

