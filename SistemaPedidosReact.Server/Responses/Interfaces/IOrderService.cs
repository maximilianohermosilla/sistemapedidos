using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IOrderService
    {
        Task<OrderReadDTO?> Create(OrderCreateDTO pOrder);
        Task<IEnumerable<OrderReadDTO>> GetAll();
        Task<IEnumerable<OrderReadPOS>> GetAllPendingsByStore(int? pStoreId);
        Task<IEnumerable<OrderReadDTO>> GetAllByCustomer(string pCustomer);       
        Task<OrderReadDTO?> GetById(int pId);
        Task<bool?> UpdateState(int? pOrderId, string pState, string pDelay);
        Task<bool?> CancelItems(int? pOrderId, IEnumerable<OrderCancelItemDTO> pItems);
    }
}
