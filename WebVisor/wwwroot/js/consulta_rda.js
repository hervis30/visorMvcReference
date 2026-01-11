// Configuración - REEMPLAZA CON TUS CREDENCIALES REALES
const CONFIG = {
    clientId: '@Configuration["FhirSettings:ClientId"]',
    clientSecret: '@Configuration["FhirSettings:ClientSecret"]',
    subscriptionKey: '@Configuration["FhirSettings:SubscriptionKey"]',
    baseUrl: '@Configuration["FhirSettings:BaseUrl"]'
};

// Función para consultar paciente
async function searchPatient() {
    const documentType = document.getElementById('documentType').value;
    const documentNumber = document.getElementById('documentNumber').value;

    if (!documentNumber) {
        showNotification('Por favor ingrese un número de documento', 'error');
        return;
    }

    showLoading(true);

    try {
        // Llamar al endpoint .NET MVC
        const response = await fetch('/Home/SearchPatient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                documentType: documentType,
                documentNumber: documentNumber
            })
        });

        const result = await response.json();

        if (result.success) {
            displayPatientInfo(result.data);
            await loadPatientRdas(result.data.id);
        } else {
            showNotification(result.message, 'error');
        }
    } catch (error) {
        showNotification('Error de conexión: ' + error.message, 'error');
    } finally {
        showLoading(false);
    }
}

// Función para cargar RDAs
async function loadPatientRdas(patientId) {
    try {
        const response = await fetch('/api/fhir/patient-rda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ patientId: patientId })
        });

        const rdas = await response.json();
        displayRdas(rdas);
    } catch (error) {
        console.error('Error cargando RDAs:', error);
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'success') {
    // Implementar con Toastr o similar
    alert(`${type.toUpperCase()}: ${message}`);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btnSearch').addEventListener('click', searchPatient);
    document.getElementById('documentNumber').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') searchPatient();
    });
});