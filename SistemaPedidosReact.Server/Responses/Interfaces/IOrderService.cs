using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IOrderService
    {
        Task<OrderReadDTO?> Create(OrderCreateDTO pOrder);
        Task<IEnumerable<OrderReadDTO>> GetAll();
        Task<OrderReadDTO?> GetById(int pId);
    }
}
