using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IOrderRepository
    {
        bool SaveChanges();
        IEnumerable<Order> GetAll();
        Order GetById(int pId);
        Order Create(Order pOrder);
    }
}
