using System.Text.Json;
using WebVisor.Models.Fhir;

namespace WebVisor.Models.Services
{
    public class FhirService : IFhirService
    {

        private readonly HttpClient _httpClient;
        private readonly IConfiguration _configuration;
        private readonly ILogger<FhirService> _logger;

        public FhirService(HttpClient httpClient, IConfiguration configuration, ILogger<FhirService> logger)
        {
            _httpClient = httpClient;
            _configuration = configuration;
            _logger = logger;

            // Configurar base URL desde appsettings
            var fhirSettings = _configuration.GetSection("FhirSettings");
            _httpClient.BaseAddress = new Uri(fhirSettings["BaseUrl"]);

            // Configurar headers de autenticación
            ConfigureAuthHeaders();
        }

        public Task<byte[]> DownloadDocumentAsync(string documentId)
        {
            throw new NotImplementedException();
        }

        public Task<CompositionDocument> GetCompositionDocumentAsync(string compositionId)
        {
            throw new NotImplementedException();
        }

        public Task<List<DigitalHealthRecord>> GetPatientRdasAsync(string patientId)
        {
            throw new NotImplementedException();
        }

        public async Task<PatientSummary> GetPatientSummaryAsync(string documentType, string documentNumber)
        {
            try
            {
                var response = await _httpClient.PostAsJsonAsync("fhir-summary", new
                {
                    documentType,
                    documentNumber
                });

                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<PatientSummary>(content);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error obteniendo resumen del paciente");
                throw;
            }
        }

        public Task<List<PatientInfo>> SearchPatientsAsync(string identifier, string name)
        {
            throw new NotImplementedException();
        }

        private void ConfigureAuthHeaders()
        {
            var fhirSettings = _configuration.GetSection("FhirSettings");

            _httpClient.DefaultRequestHeaders.Add("client-id", fhirSettings["ClientId"]);
            _httpClient.DefaultRequestHeaders.Add("client-secret", fhirSettings["ClientSecret"]);
            _httpClient.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", fhirSettings["SubscriptionKey"]);
        }
    }
}
