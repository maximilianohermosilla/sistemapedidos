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

                var vOrders = await vGblService.Create(pOrder);

                return Ok(vOrders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
