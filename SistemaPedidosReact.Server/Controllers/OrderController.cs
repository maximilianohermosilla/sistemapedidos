using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.Data;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Controllers
{
    public class OrderController : Controller
    {
        [HttpPost("orders")]
        public async Task<IActionResult> CreateOrder([FromBody] List<Order> ordersDto, [FromServices] AppDbContext context)
        {
            //foreach (var dto in ordersDto)
            //{
            //    // mapear el DTO al modelo EF
            //    var order = new Order
            //    {
            //        Store = new Store
            //        {
            //            InternalId = dto.store.internal_id,
            //            ExternalId = dto.store.external_id,
            //            Name = dto.store.name
            //        },
            //        OrderDetail = new OrderDetail
            //        {
            //            OrderExternalId = dto.order_detail.order_id,
            //            CreatedAt = dto.order_detail.created_at,
            //            DeliveryMethod = dto.order_detail.delivery_method,
            //            MesaId = dto.order_detail.mesa_id,
            //            PaymentMethod = dto.order_detail.payment_method,
            //            Totals = new Totals
            //            {
            //                TotalProducts = dto.order_detail.totals.total_products,
            //                TotalDiscounts = dto.order_detail.totals.total_discounts,
            //                TotalOrder = dto.order_detail.totals.total_order,
            //                TotalToPay = dto.order_detail.totals.total_to_pay,
            //                Charges = new Charges
            //                {
            //                    Shipping = dto.order_detail.totals.charges.shipping,
            //                    ServiceFee = dto.order_detail.totals.charges.service_fee
            //                },
            //                OtherTotals = new OtherTotals
            //                {
            //                    Tip = dto.order_detail.totals.other_totals.tip
            //                }
            //            },
            //            Items = dto.order_detail.items.Select(i => new OrderItem
            //            {
            //                ExternalId = i.id,
            //                Sku = i.sku,
            //                Name = i.name,
            //                Type = i.type,
            //                Comments = i.comments,
            //                Price = i.price,
            //                Quantity = i.quantity,
            //                SubItems = i.subitems.Select(s => new OrderSubItem
            //                {
            //                    ExternalId = s.id,
            //                    Sku = s.sku,
            //                    Name = s.name,
            //                    Type = s.type,
            //                    Price = s.price,
            //                    Quantity = s.quantity
            //                }).ToList()
            //            }).ToList()
            //        }
            //    };

            //    context.Orders.Add(order);
            //}

            //await context.SaveChangesAsync();
            return Ok();
        }
    }
}
