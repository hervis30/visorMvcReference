using WebVisor.Models.Fhir;

namespace WebVisor.Models.Services
{
    public interface IFhirService
    {
        Task<PatientSummary> GetPatientSummaryAsync(string documentType, string documentNumber);
        Task<List<PatientInfo>> SearchPatientsAsync(string identifier, string name);
        Task<List<DigitalHealthRecord>> GetPatientRdasAsync(string patientId);
        Task<CompositionDocument> GetCompositionDocumentAsync(string compositionId);
        Task<byte[]> DownloadDocumentAsync(string documentId);
    }
}
