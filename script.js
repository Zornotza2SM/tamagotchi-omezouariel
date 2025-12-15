// --- MODELO ---
let hambre = 0;
let felicidad = 10;
let comiendo = false;
let jugando = false;

// --- VISTA ---
function vista() {
    let estaMuerto = (hambre >= 10 || felicidad <= 0);
    let cara = estaMuerto ? "💀" : "👾";
    let mensaje = estaMuerto ? "<div class='game-over'>GAME OVER</div>" : "";

    let urlCorazon = felicidad < 4 
        ? "https://assets9.lottiefiles.com/private_files/lf30_434185.json"
        : "https://assets10.lottiefiles.com/packages/lf20_7z8wtyb0.json";

    document.getElementById("app").innerHTML = `
        <div class="pet-screen">
            <h1>PIXEL PET</h1>
            
            <div class="pet-face">${cara}</div>
            ${mensaje}

            <div class="stats">
                <div style="display:flex; align-items:center; flex-direction:column">
                    <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_j1adxa_sv.json"
                        background="transparent" speed="1" style="width:50px; height:50px;" loop autoplay>
                    </lottie-player>
                    <span>Hambre: ${hambre}</span>
                </div>

                <div style="display:flex; align-items:center; flex-direction:column">
                    <lottie-player src="${urlCorazon}" background="transparent" speed="1" style="width:50px; height:50px;" loop autoplay>
                    </lottie-player>
                    <span>Felicidad: ${felicidad}</span>
                </div>
            </div>

            <div class="controls">
                <button class="boton" id="btn-comer" ${comiendo || estaMuerto ? "disabled" : ""}>
                    ${comiendo ? "Masticando..." : "Dar Comida"}
                </button>
                <button class="boton" id="btn-jugar" ${jugando || estaMuerto ? "disabled" : ""}>
                    ${jugando ? "Cansado..." : "Jugar"}
                </button>
            </div>
        </div>
    `;

    if (!estaMuerto) {
        document.getElementById("btn-comer").onclick = () => {
            if (hambre > 0 && !comiendo) {
                hambre--;
                comiendo = true;
                vista();
                setTimeout(() => { comiendo = false; vista(); }, 1000);
            }
        }

        document.getElementById("btn-jugar").onclick = () => {
            if (felicidad < 10 && !jugando) {
                felicidad++;
                jugando = true;
                vista();
                setTimeout(() => { jugando = false; vista(); }, 2000);
            }
        }
    }
}

// Inicializamos la vista
vista();

// --- LOOP DEL TIEMPO ---
function pasoDelTiempo() {
    setTimeout(() => {
        hambre++;
        felicidad--;
        if (hambre > 10) hambre = 10;
        if (felicidad < 0) felicidad = 0;

        vista();
        pasoDelTiempo();
    }, 2000);
}

pasoDelTiempo();
