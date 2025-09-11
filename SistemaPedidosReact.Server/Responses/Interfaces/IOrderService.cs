using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IOrderService
    {
        Task<OrderReadDTO?> Create(OrderCreateDTO pOrder);
        Task<IEnumerable<OrderReadDTO>> GetAll();
        Task<IEnumerable<OrderReadPOS>> GetAllPendingsByStore(int? pStoreId);
        Task<OrderReadDTO?> GetById(int pId);
    }
}
