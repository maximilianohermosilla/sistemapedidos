using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IMenuRepository
    {
        bool SaveChanges();
        IEnumerable<Menu> GetAll();
        Menu GetById(int pId);
        Menu GetLastMenu();
        Menu Create(Menu pMenu);
    }
}
