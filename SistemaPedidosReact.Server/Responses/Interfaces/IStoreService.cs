using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IStoreService
    {
        Task<StoreReadDTO?> Create(StoreCreateDTO pStore);
        Task<IEnumerable<StoreReadDTO>> GetAll();
        Task<StoreReadDTO?> GetById(int pId);
        Task<StoreReadDTO?> GetByInternalId(string pInternalId);
        Task<StoreReadDTO?> GetByExternalId(string pExternalId);
    }
}
