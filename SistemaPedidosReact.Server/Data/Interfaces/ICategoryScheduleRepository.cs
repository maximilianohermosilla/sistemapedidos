using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface ICategoryScheduleRepository
    {
        bool SaveChanges();
        IEnumerable<CategorySchedule> GetAll();
        CategorySchedule? GetById(int pId);
        IEnumerable<CategorySchedule> GetAllByCategoryId(int pCategoryId);
        CategorySchedule Create(CategorySchedule pCategorySchedule);
        bool Delete(int pId);
    }
}
