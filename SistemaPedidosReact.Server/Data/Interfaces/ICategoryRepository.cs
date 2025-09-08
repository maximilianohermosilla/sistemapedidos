using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface ICategoryRepository
    {
        bool SaveChanges();
        IEnumerable<Category> GetAll();
        Category GetById(int pId);
        Category Create(Category pCategory);
    }
}
