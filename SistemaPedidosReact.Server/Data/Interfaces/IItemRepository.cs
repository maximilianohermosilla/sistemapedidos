using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IItemRepository
    {
        bool SaveChanges();
        IEnumerable<Item> GetAll();
        IEnumerable<Item> Search(string pSearch);
        Item GetById(int pId);
        Item GetBySku(string pSku);
        Item Create(Item pItem);
    }
}
