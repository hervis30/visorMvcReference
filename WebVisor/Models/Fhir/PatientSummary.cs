namespace WebVisor.Models.Fhir
{
    public class PatientSummary
    {
        public PatientInfo Patient { get; set; }
        public List<DigitalHealthRecord> LatestRecords { get; set; }
    }
}
