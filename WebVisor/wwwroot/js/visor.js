// wwwroot/js/visor.js
function showLoading(show) {
    const loadingElement = document.getElementById('loadingIndicator') || createLoadingElement();

    if (show) {
        loadingElement.style.display = 'block';
        // Deshabilitar botón de búsqueda
        document.getElementById('btnSearch').disabled = true;
        document.getElementById('btnSearch').innerHTML = '<i class="fas fa-spinner fa-spin"></i> Consultando...';
    } else {
        loadingElement.style.display = 'none';
        // Habilitar botón de búsqueda
        document.getElementById('btnSearch').disabled = false;
        document.getElementById('btnSearch').innerHTML = '<i class="fas fa-search"></i> Consultar Información';
    }
}

function createLoadingElement() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 1000;
        display: none;
    `;
    loadingDiv.innerHTML = `
        <div class="text-center">
            <div class="spinner-border text-light" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
            <p class="mt-2">Consultando información del paciente...</p>
        </div>
    `;
    document.body.appendChild(loadingDiv);
    return loadingDiv;
}

// Función para mostrar información del paciente
function displayPatientInfo(patientData) {
    const patientInfoDiv = document.getElementById('patientInfo');
    const attentionHistoryDiv = document.getElementById('attentionHistory');

    if (!patientData || !patientData.patient) {
        patientInfoDiv.innerHTML = `
            <div class="alert alert-warning">
                No se encontró información del paciente
            </div>
        `;
        patientInfoDiv.style.display = 'block';
        attentionHistoryDiv.style.display = 'none';
        return;
    }

    const patient = patientData.patient;

    patientInfoDiv.innerHTML = `
        <div class="card">
            <div class="card-header bg-primary text-white">
                <h4 class="mb-0">Información del Paciente</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <div class="col-md-4">
                        <strong>Nombre:</strong> ${patient.name || 'No disponible'}
                    </div>
                    <div class="col-md-3">
                        <strong>Tipo Documento:</strong> ${patient.documentType || 'CC'}
                    </div>
                    <div class="col-md-3">
                        <strong>Número Documento:</strong> ${patient.documentNumber || ''}
                    </div>
                    <div class="col-md-2">
                        <strong>Género:</strong> ${patient.gender || 'No especificado'}
                    </div>
                </div>
                ${patient.birthDate ? `
                <div class="row mt-2">
                    <div class="col-md-4">
                        <strong>Fecha Nacimiento:</strong> ${new Date(patient.birthDate).toLocaleDateString()}
                    </div>
                </div>` : ''}
            </div>
        </div>
    `;

    patientInfoDiv.style.display = 'block';
}

// Función para mostrar RDAs
function displayRdas(rdas) {
    const tableBody = document.getElementById('rdaTableBody');
    const attentionHistoryDiv = document.getElementById('attentionHistory');

    if (!rdas || rdas.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">No se encontraron registros de atención</td>
            </tr>
        `;
        attentionHistoryDiv.style.display = 'block';
        return;
    }

    let html = '';
    rdas.forEach((rda, index) => {
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${rda.format || 'Resumen Digital de Atención en Salud'}</td>
                <td>${rda.region || 'No especificada'}</td>
                <td>${rda.author || 'No especificado'}</td>
                <td>${new Date(rda.date).toLocaleString()}</td>
                <td>
                    <button class="btn btn-sm btn-info" onclick="viewRdaDetail('${rda.documentId}')">
                        <i class="fas fa-eye"></i> Ver
                    </button>
                </td>
            </tr>
        `;
    });

    tableBody.innerHTML = html;
    attentionHistoryDiv.style.display = 'block';
}

// Función para ver detalle de RDA
function viewRdaDetail(documentId) {
    alert(`Mostraría el detalle del documento: ${documentId}\nEsta funcionalidad se implementará más adelante.`);
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Si tienes Toastr o similar, úsalo aquí
    // Por ahora usamos un alert simple
    const alertClass = type === 'error' ? 'alert-danger' : 'alert-success';
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${alertClass} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;

    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);

    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}