using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/")]
    [ApiController]
    public class OrdersPOSController : ControllerBase
    {
        private readonly IOrderService vGblService;
        private readonly IStoreService vGblStoreService;

        public OrdersPOSController(IOrderService pService, IStoreService pStoreService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
        }

        [HttpPost]
        [Route("orders")]
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

        [HttpPut]
        [Route("orders_update")]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> OrdersUpdate([FromQuery] string storeid,
                        [FromQuery] string orderId, [FromQuery] string state, [FromQuery] string delay)
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

        [HttpPost]
        [Route("orders_cancel/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> OrdersCancel(string orderId, [FromBody] OrderCancelDTO pOrderCancel)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(orderId);

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
