namespace WebVisor.Models.Fhir
{
    public class DigitalHealthRecord
    {
        public int Id { get; set; }
        public string Format { get; set; }
        public string Region { get; set; }
        public string Author { get; set; }
        public DateTime Date { get; set; }
        public string DocumentId { get; set; }
    }
}
