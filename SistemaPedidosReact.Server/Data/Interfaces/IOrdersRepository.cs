using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IOrderRepository
    {
        bool SaveChanges();
        IEnumerable<Order> GetAll();
        IEnumerable<Order> GetAllPendingsByStore(int? pStoreId);
        IEnumerable<Order> GetAllByCustomer(string pCustomer);
        Order GetById(int pId);
        Order Create(Order pOrder);
    }
}
