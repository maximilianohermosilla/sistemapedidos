using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface ICategoryScheduleService
    {
        Task<IEnumerable<CategoryScheduleReadDTO>> GetAll();
        Task<CategoryScheduleReadDTO?> GetById(int pId);
        Task<IEnumerable<CategoryScheduleReadDTO>> GetAllByCategoryId(int pCategoryId);
        Task<CategoryScheduleReadDTO> Create(CategoryScheduleCreateDTO pCategorySchedule);
        Task<CategoryScheduleReadDTO> Update(CategoryScheduleCreateDTO pCategorySchedule);
        Task<bool?> Delete(int pId);
    }
}
