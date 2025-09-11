using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService vGblService;
        private readonly IStoreService vGblStoreService;
        private readonly IUserService vGblUserService;

        public OrdersController(IOrderService pService, IStoreService pStoreService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> GetAllOrdersPOS([FromQuery] string storeid)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(storeid);

                if (vStore == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                var vOrders = await vGblService.GetAllPendingsByStore(vStore.Id);

                return Ok(vOrders);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
