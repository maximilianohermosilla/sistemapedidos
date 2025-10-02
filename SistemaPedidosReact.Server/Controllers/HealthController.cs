using Microsoft.AspNetCore.Mvc;

namespace SistemaPedidosReact.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() => Ok(new { status = "Healthy", timestamp = DateTime.UtcNow });
    }
}
