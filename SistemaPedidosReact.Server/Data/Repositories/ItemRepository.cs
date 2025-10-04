using Microsoft.EntityFrameworkCore;
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

        public IEnumerable<Item> Search(string pSearch)
        {
            var vMaxMenuId = vGblContext.Menus.Max(c => c.Id);
            var vItems = vGblContext.Items.Include(i => i.Category).Where(i => i.MenuId == vMaxMenuId && i.Type!.ToUpper() == "PRODUCT" &&
                (i.Name!.ToLower().Contains(pSearch!.ToLower()) || i.Description!.ToLower().Contains(pSearch!.ToLower()) || i.Category!.Name!.ToLower().Contains(pSearch!.ToLower())))
                .ToList();
            return vItems;
        }        

        public Item GetById(int pId)
        {
            return vGblContext.Items.FirstOrDefault(e => e.Id == pId)!;
        }

        public IEnumerable<Item> GetAllByMenuId(int pMenuId)
        {
            return vGblContext.Items.Where(e => e.MenuId == pMenuId)!.ToList();
        }

        public IEnumerable<Item> GetAllByLastMenu()
        {
            var vMenuId = vGblContext.Menus.Max(c => c.Id);
            return vGblContext.Items.Where(e => e.MenuId == vMenuId)!.ToList();
        }

        public Item GetBySku(string pSku)
        {
            return vGblContext.Items.FirstOrDefault(e => e.Sku == pSku)!;
        }

        public EntityState Detach(Item pItem)
        {
           return vGblContext.Entry(pItem).State = EntityState.Detached;
        }
    }
}
