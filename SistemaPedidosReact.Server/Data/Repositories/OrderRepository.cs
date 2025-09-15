using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class OrderRepository: IOrderRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public OrderRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Order Create(Order pOrder)
        {
            vGblContext.Orders.Add(pOrder);
            vGblContext.SaveChanges();

            return pOrder;
        }

        public IEnumerable<Order> GetAll()
        {
            return vGblContext.Orders.ToList();
        }

        public IEnumerable<Order> GetAllPendingsByStore(int? pStoreId)
        {
            var vOrders =  vGblContext.Orders
                .Include(o => o.Customer).Include(o => o.Store)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.Mesa)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.PaymentMethod)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.Totals)!.ThenInclude(t => t!.Charges)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.Totals)!.ThenInclude(t => t!.OtherTotals)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.DeliveryInformation)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.BillingInformation)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.DeliveryDiscount)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.Discounts)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.OrderItems).ThenInclude(i => i!.Item)
                .Include(o => o.OrderDetail).ThenInclude(d => d!.OrderItems).ThenInclude(i => i.OrderSubItems).ThenInclude(s => s.Item)
                .Where(o => o.StoreId == pStoreId && o.OrderStateId == null).ToList();

            return vOrders;
        }

        public Order GetById(int pId)
        {
            return vGblContext.Orders.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
