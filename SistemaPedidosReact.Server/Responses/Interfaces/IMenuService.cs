using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IMenuService
    {
        Task<MenuReadDTO?> Create(MenuCreateDTO pMenu);
        Task<MenuReadDTO?> CreateMenuPOS(MenuCreatePOS pMenu);
        Task<IEnumerable<MenuReadDTO>> GetAll();
        Task<MenuReadDTO?> GetById(int pId);
    }
}
