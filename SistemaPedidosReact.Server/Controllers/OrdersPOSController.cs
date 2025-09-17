using Microsoft.AspNetCore.Authorization;
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
        [Authorize]
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
        [Authorize]
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

                var vOrderUpdated = await vGblService.UpdateState(Convert.ToInt32(orderId), state, delay);

                if(vOrderUpdated == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Orden no encontrada" });
                }

                if (vOrderUpdated == false)
                {
                    return BadRequest(new ResponseMessage() { Message = "Cambio de estado inválido" });
                }

                return Ok(new ResponseMessage() { Message = "Orden modificada" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("orders_cancel/{orderId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> OrdersCancel(string orderId, [FromBody] OrderCancelDTO pOrderCancel)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(pOrderCancel.StoreId);

                if (vStore == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                var vOrder = await vGblService.CancelItems(Convert.ToInt32(orderId), pOrderCancel.Items);

                if(vOrder == null)
                {
                    return BadRequest(new ResponseMessage() { Message = "La orden es inválida" });
                }

                return Ok(new ResponseMessage() { Message = "OK" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
