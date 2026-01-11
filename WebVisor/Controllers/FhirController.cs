using Microsoft.AspNetCore.Mvc;
using WebVisor.Models.Query;
using WebVisor.Models.Services;

namespace WebVisor.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FhirController : Controller
    {
            private readonly IFhirService _fhirService;

            public FhirController(IFhirService fhirService)
            {
                _fhirService = fhirService;
            }

            [HttpPost("fhir-summary")]
            public async Task<IActionResult> GetFhirSummary([FromBody] PatientQuery query)
            {
                var result = await _fhirService.GetPatientSummaryAsync(query.DocumentType, query.DocumentNumber);
                return Ok(result);
            }

            [HttpPost("query-patient")]
            public async Task<IActionResult> QueryPatient([FromBody] PatientSearch search)
            {
                var result = await _fhirService.SearchPatientsAsync(search.Identifier, search.Name);
                return Ok(result);
            }

            [HttpPost("patient-rda")]
            public async Task<IActionResult> GetPatientRdas([FromBody] RdaQuery query)
            {
                var result = await _fhirService.GetPatientRdasAsync(query.PatientId);
                return Ok(result);
            }

            // Otros endpoints...
    }
}
