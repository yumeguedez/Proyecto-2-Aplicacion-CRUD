const nombreImput = document.getElementById("nombreInput");
const montoDeuda = document.getElementById("montoInput");
const idInput = document.getElementById("idInput");
const deudas = JSON.parse(localStorage.getItem("deudas")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");

const btnAgregar = document.getElementById("btnAgregar");
const btnEditar = document.getElementById("btnEditar");

const crearDeuda = () => {
  const deuda = {
    id: crypto.randomUUID(),
    nombre: nombreImput.value,
    monto: montoDeuda.value,
  };

  deudas.push(deuda);

  localStorage.setItem("deudas", JSON.stringify(deudas));
  mostrarDeudas();

  idInput.value = "";
  nombreImput.value = "";
  montoDeuda.value = "";
};

const mostrarDeudas = () => {
  cuerpoTabla.innerHTML = "";
  deudas.forEach((deuda) => {
    cuerpoTabla.innerHTML += `<tr>
        <th scope="row">${deuda.id}</th>
        <td>${deuda.nombre}</td>
        <td>${deuda.monto}</td>
        <td>
        <button
          type="button"
          class="btn btn-danger"
          onclick="eliminarDeuda('${deuda.id}')"
        >
          Eliminar
        </button>
        <td>
        <td>
        <button
          type="button"
          class="btn btn-warning"
          onclick="editarDeuda('${deuda.id}')"
        >
          Editar
        </button>
        </td>
    </tr>`;
  });
};

const eliminarDeuda = (id) => {
  const deuda = deudas.find((deuda) => deuda.id === id);
  const index = deudas.indexOf(deuda);
  deudas.splice(index, 1);
  localStorage.setItem("deudas", JSON.stringify(deudas));
  mostrarDeudas();
};

const editarDeuda = (id) => {
  btnAgregar.style.display = "none";
  btnEditar.style.display = "inline";

  const deuda = deudas.find((deuda) => deuda.id === id);
  idInput.value = deuda.id;
  nombreImput.value = deuda.nombre;
  montoDeuda.value = deuda.monto;
};

const deudaEditada = () => {
  const deuda = deudas.find((deuda) => deuda.id === idInput.value);
  deuda.nombre = nombreImput.value;
  deuda.monto = montoDeuda.value;
  localStorage.setItem("deudas", JSON.stringify(deudas));

  btnAgregar.style.display = "inline";
  btnEditar.style.display = "none";

  idInput.value = "";
  nombreImput.value = "";
  montoDeuda.value = "";

  mostrarDeudas();
};

window.addEventListener("load", mostrarDeudas);
