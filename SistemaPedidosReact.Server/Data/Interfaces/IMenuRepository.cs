using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IMenuRepository
    {
        bool SaveChanges();
        IEnumerable<Menu> GetAll();
        Menu GetById(int pId);
        Menu Create(Menu pMenu);
    }
}
