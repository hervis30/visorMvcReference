using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using WebVisor.Models;
using WebVisor.Models.Services;

namespace WebVisor.Controllers
{
    public class HomeController : Controller
    {
        private readonly IFhirService _fhirService;
        private readonly ILogger<HomeController> _logger;

        public HomeController(IFhirService fhirService, ILogger<HomeController> logger)
        {
            _fhirService = fhirService;
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SearchPatient(string documentType, string documentNumber)
        {
            try
            {
                var patientSummary = await _fhirService.GetPatientSummaryAsync(documentType, documentNumber);
                return Json(new { success = true, data = patientSummary });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error buscando paciente");
                return Json(new { success = false, message = ex.Message });
            }
        }

    }
}
