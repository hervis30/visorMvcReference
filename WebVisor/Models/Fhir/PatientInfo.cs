namespace WebVisor.Models.Fhir
{
    public class PatientInfo
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string DocumentType { get; set; }
        public string DocumentNumber { get; set; }
        public DateTime BirthDate { get; set; }
        public string Gender { get; set; }
    }
}
