let tasaDeCambioARS;
let tasaDeCambioPEN;

// === Tasa ARS/USD (dólar blue) ===
async function obtenerTasaDeCambioARS() {
  try {
    const response = await fetch('https://dolarapi.com/v1/dolares/blue');
    const data = await response.json();
    tasaDeCambioARS = data.venta;
    document.getElementById('tasa').innerText =
      `1 USD = ${tasaDeCambioARS} ARS (blue)`;
  } catch (e) {
    document.getElementById('tasa').innerText = 'Error al obtener tasa ARS/USD';
  }
}

// === Conversiones ARS/USD ===
function convertirAPeso() {
  const pesos = document.getElementById('peso').value;
  if (!pesos || !tasaDeCambioARS) return alert("Falta dato o tasa");
  const dolares = pesos / tasaDeCambioARS;
  document.getElementById('resultado').innerText = `${pesos} ARS = ${dolares.toFixed(2)} USD`;
}

function convertirADolar() {
  const dolares = document.getElementById('dolar').value;
  if (!dolares || !tasaDeCambioARS) return alert("Falta dato o tasa");
  const pesos = dolares * tasaDeCambioARS;
  document.getElementById('resultadoDolar').innerText = `${dolares} USD = ${pesos.toFixed(2)} ARS`;
}

// === Tasa PEN/USD ===
async function obtenerTasaDeCambioPEN() {
  try {
    const response = await fetch("https://open.er-api.com/v6/latest/USD");
    const data = await response.json();
    tasaDeCambioPEN = data.rates.PEN;
    document.getElementById('tasaSol').innerText =
      `1 USD = ${tasaDeCambioPEN.toFixed(3)} PEN`;
  } catch (e) {
    document.getElementById('tasaSol').innerText = 'Error al obtener tasa PEN/USD';
  }
}

// === Conversiones PEN/USD ===
function convertirASol() {
  const soles = document.getElementById('sol').value;
  if (!soles || !tasaDeCambioPEN) return alert("Falta dato o tasa");
  const dolares = soles / tasaDeCambioPEN;
  document.getElementById('resultadoSol').innerText = `${soles} PEN = ${dolares.toFixed(2)} USD`;
}

function convertirAUsdDesdeSol() {
  const usd = document.getElementById('usdSol').value;
  if (!usd || !tasaDeCambioPEN) return alert("Falta dato o tasa");
  const soles = usd * tasaDeCambioPEN;
  document.getElementById('resultadoUsdSol').innerText = `${usd} USD = ${soles.toFixed(2)} PEN`;
}

// === Conversiones PEN/ARS usando USD como puente ===
function convertirSolAPeso() {
  const soles = document.getElementById('solToArs').value;
  if (!soles || !tasaDeCambioPEN || !tasaDeCambioARS) return alert("Falta dato o tasa");
  const usd = soles / tasaDeCambioPEN;
  const ars = usd * tasaDeCambioARS;
  document.getElementById('resultadoSolArs').innerText = `${soles} PEN = ${ars.toFixed(2)} ARS`;
}

function convertirPesoASol() {
  const ars = document.getElementById('arsToSol').value;
  if (!ars || !tasaDeCambioPEN || !tasaDeCambioARS) return alert("Falta dato o tasa");
  const usd = ars / tasaDeCambioARS;
  const soles = usd * tasaDeCambioPEN;
  document.getElementById('resultadoArsSol').innerText = `${ars} ARS = ${soles.toFixed(2)} PEN`;
}

// === Modo oscuro ===
document.getElementById('toggle-dark').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

// Init
obtenerTasaDeCambioARS();
obtenerTasaDeCambioPEN();
