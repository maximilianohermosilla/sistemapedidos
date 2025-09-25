using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface ICategoryService
    {
        Task<CategoryReadDTO?> Create(CategoryCreateDTO pCategory);
        Task<IEnumerable<CategoryReadDTO>> GetAll();
        Task<CategoryReadDTO?> GetById(int pId);
    }
}
