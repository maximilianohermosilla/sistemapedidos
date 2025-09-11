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

        public Order GetById(int pId)
        {
            return vGblContext.Orders.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
