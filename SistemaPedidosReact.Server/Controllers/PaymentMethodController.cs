using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentMethodController : ControllerBase
    {
        private readonly IPaymentMethodService vGblService;

        public PaymentMethodController(IPaymentMethodService pService)
        {
            vGblService = pService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<PaymentMethodReadDTO>>> GetAll()
        {
            try
            {
                var vPaymentMethods = await vGblService.GetAll();

                return Ok(vPaymentMethods);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentMethodReadDTO>> GetById(int id)
        {
            try
            {
                var vPaymentMethod = await vGblService.GetById(id);

                return Ok(vPaymentMethod);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<PaymentMethodReadDTO>> Create(PaymentMethodCreateDTO pPaymentMethod)
        {
            try
            {
                var vPaymentMethod = await vGblService.Create(pPaymentMethod);

                return Created("", vPaymentMethod);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
