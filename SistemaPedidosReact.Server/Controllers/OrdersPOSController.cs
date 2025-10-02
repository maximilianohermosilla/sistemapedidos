using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;
using System.Text.Json;

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

        [HttpGet]
        [Route("orders")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderReadPOS>>> GetAllOrdersPOS([FromQuery] string storeid)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(storeid);

                if (vStore == null)
                {
                    Console.WriteLine("Tienda no encontrada (GetAllOrdersPOS)");
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                Console.WriteLine($"*** Get Orders Store : {storeid}");
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

                Console.WriteLine($"*** Update Orders Store : {storeid}");

                if (vStore == null)
                {
                    Console.WriteLine("Tienda no encontrada (OrdersUpdate)");
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                var vOrderUpdated = await vGblService.UpdateState(Convert.ToInt32(orderId), state, delay);

                if(vOrderUpdated == null)
                {
                    Console.WriteLine($"Orden no encontrada: {orderId}");
                    return NotFound(new ResponseMessage() { Message = "Orden no encontrada" });
                }

                if (vOrderUpdated == false)
                {
                    Console.WriteLine($"Cambio de estado inválida. Order = {orderId}, State = {state}, Delay = {delay}");
                    return BadRequest(new ResponseMessage() { Message = "Cambio de estado inválido" });
                }

                Console.WriteLine($"Orden modificada. Order = {orderId}, State = {state}, Delay = {delay}");
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
                    Console.WriteLine("Tienda no encontrada (OrdersCancel)");
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                var vOrder = await vGblService.CancelItems(Convert.ToInt32(orderId), pOrderCancel.Items);

                if(vOrder == null)
                {
                    Console.WriteLine("La orden es inválida");
                    return BadRequest(new ResponseMessage() { Message = "La orden es inválida" });
                }

                Console.WriteLine($"Orden {orderId} actualizada. {JsonSerializer.Serialize(pOrderCancel)}");
                return Ok(new ResponseMessage() { Message = "OK" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
