function generarColilla() {
    const nombreColaborador = document.getElementById('nombreColaborador').value;
    const identificacion = document.getElementById('identificacion').value;
    const fechaEmision = document.getElementById('fechaEmision').value;
    const salarioBasico = parseFloat(document.getElementById('salarioBasico').value);
    const email = document.getElementById('email').value;

    if (!nombreColaborador || !identificacion || !fechaEmision || !salarioBasico || !email) {
        alert('Por favor, complete todos los campos.');
        return;
    }

    const salarioPorDia = salarioBasico / 30;
    const descuentoSeguro = salarioBasico * 0.1067;
    const totalDevengado = salarioBasico;
    const totalDescuentos = descuentoSeguro;
    const totalNeto = totalDevengado - totalDescuentos;

    document.getElementById('colillaNombre').textContent = nombreColaborador;
    document.getElementById('colillaId').textContent = identificacion;
    document.getElementById('colillaFecha').textContent = formatDate(fechaEmision);

    document.getElementById('colillaTitle').textContent = getColillaTitle(fechaEmision);
    document.getElementById('quincena').textContent = getQuincenaString(fechaEmision);

    const colillaBody = document.getElementById('colillaBody');
    colillaBody.innerHTML = `
        <tr>
            <td>Salario Básico</td>
            <td>30 días</td>
            <td>$${salarioPorDia.toFixed(2)}/día</td>
            <td>$${salarioBasico.toFixed(2)}</td>
        </tr>
        <tr>
            <td>Descuento de Seguro Social (10.67%)</td>
            <td>1</td>
            <td>-$${descuentoSeguro.toFixed(2)}</td>
            <td>-$${descuentoSeguro.toFixed(2)}</td>
        </tr>
    `;

    const colillaFoot = document.getElementById('colillaFoot');
    colillaFoot.innerHTML = `
        <tr>
            <td colspan="3" style="text-align: right;"><strong>Total Devengado:</strong></td>
            <td>$${totalDevengado.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: right;"><strong>Total Descuentos:</strong></td>
            <td>-$${totalDescuentos.toFixed(2)}</td>
        </tr>
        <tr>
            <td colspan="3" style="text-align: right;"><strong>Total Neto a Pagar:</strong></td>
            <td><strong>$${totalNeto.toFixed(2)}</strong></td>
        </tr>
    `;

    document.getElementById('formulario').style.display = 'none';
    document.getElementById('colilla').style.display = 'block';
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

function getQuincenaString(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('es-ES', { month: 'long' });
    const year = date.getFullYear();
    const quincena = day <= 15 ? 'Primera' : 'Segunda';
    return `${quincena} Quincena de ${month} ${year}`;
}

function getColillaTitle(dateString) {
    const date = new Date(dateString);
    const quincena = date.getDate() <= 15 ? '1ra' : '2da';
    return `Colilla de Pago ${quincena} ${date.getFullYear()}`;
}

function enviarPorCorreo() {
    alert('En una implementación real, aquí se enviaría la colilla por correo electrónico.');
}

function volverAlFormulario() {
    document.getElementById('formulario').style.display = 'block';
    document.getElementById('colilla').style.display = 'none';
}