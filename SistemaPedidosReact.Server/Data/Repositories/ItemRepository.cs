using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class ItemRepository: IItemRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public ItemRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Item Create(Item pItem)
        {
            vGblContext.Items.Add(pItem);
            vGblContext.SaveChanges();

            return pItem;
        }

        public IEnumerable<Item> GetAll()
        {
            return vGblContext.Items.ToList();
        }

        public Item GetById(int pId)
        {
            return vGblContext.Items.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
