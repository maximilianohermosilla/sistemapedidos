using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IItemRepository
    {
        bool SaveChanges();
        EntityState Detach(Item pItem);
        IEnumerable<Item> GetAll();
        IEnumerable<Item> Search(string pSearch);
        Item GetById(int pId);
        IEnumerable<Item> GetAllByMenuId(int pMenuId);
        IEnumerable<Item> GetAllByLastMenu();
        Item GetBySku(string pSku);
        Item Create(Item pItem);
    }
}
