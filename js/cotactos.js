// EL CODEGO DE MAPA 
// PEDIR LAS CORDINADAS AL CLIENT
const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
}

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        success,
        error,
        options
    )
} else {
    alert("Los servicios de geolocalización no están disponibles")
}

function success(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    let map = L.map('mapa', {
        center: [latitude, longitude],
        zoom: 14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">click aquí</a>'
    }).addTo(map);

    L.Routing.control({
        waypoints: [
            L.latLng(latitude, longitude),
            L.latLng(42.060035, -1.601222)
        ],
        language: 'es'
    }).addTo(map);
}

function error() {
    let map = L.map('mapa', {
        center: [42.060035, -1.601222],
        zoom: 14
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '<a href="https://www.openstreetmap.org/copyright">click aquí para ver más grande</a>'
    }).addTo(map);
}



// function de mostrar el numero 

let btnNumero = document.getElementById('numero');
let mostrarNumero = document.getElementById('mostrar-numero')
function mostrar(){
    mostrarNumero.style.display = 'block'
}
btnNumero.addEventListener('click' ,()=> mostrar())
