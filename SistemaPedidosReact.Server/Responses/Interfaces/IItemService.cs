using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IItemService
    {
        Task<ItemReadDTO?> Create(ItemCreateDTO pItem);
        Task<IEnumerable<ItemReadDTO>> GetAll();
        Task<ItemReadDTO?> GetById(int pId);
    }
}
