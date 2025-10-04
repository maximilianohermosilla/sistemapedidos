using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService vGblService;
        private readonly IStoreService vGblStoreService;

        public OrderController(IOrderService pService, IStoreService pStoreService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> Create(OrderCreateDTO pOrder)
        {
            try
            {
                var vStore = await vGblStoreService.GetById(pOrder.StoreId);

                if (vStore == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                var vOrderValid = await vGblService.ValidateOrder(pOrder);

                if (!string.IsNullOrEmpty(vOrderValid))
                {
                    return BadRequest(new ResponseMessage() { Message = vOrderValid });
                }

                var vOrderCreated = await vGblService.Create(pOrder);

                if(vOrderCreated == null)
                {
                    return BadRequest(new ResponseMessage() { Message = "Ocurrió un error al crear la orden" });
                }

                return Ok(vOrderCreated);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{client}")]
        public async Task<ActionResult<IEnumerable<OrderReadDTO>>> GetAllByCustomer(string client)
        {
            try
            {
                var vParameter = await vGblService.GetAllByCustomer(client);

                if (vParameter == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Ocurrió un error al obtener los pedidos." });
                }

                return Ok(vParameter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
