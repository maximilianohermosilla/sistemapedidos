using Microsoft.AspNetCore.Http.Features;
using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class MenuRepository : IMenuRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public MenuRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Menu Create(Menu pMenu)
        {
            vGblContext.Menus.Add(pMenu);
            vGblContext.SaveChanges();

            return pMenu;
        }

        public IEnumerable<Menu> GetAll()
        {
            return vGblContext.Menus.Include(m => m.Items)!.ThenInclude(i => i.Category).ToList();
        }

        public Menu GetById(int pId)
        {
            return vGblContext.Menus.Where(e => e.Id == pId).Include(m => m.Items)!.ThenInclude(i => i.Category)
                .Include(m => m.Items!).ThenInclude(i => i.Children!).ThenInclude(i => i.Category).FirstOrDefault()!;

        }

        public Menu GetLastMenu()
        {
            var vMenu =  vGblContext.Menus.OrderByDescending(e => e.Id)!.Include(m => m.Items)!.ThenInclude(i => i.Category)
                .Include(m => m.Items!).ThenInclude(i => i.Children!).ThenInclude(i => i.Category).FirstOrDefault()!;
            vMenu.Items = vMenu.Items.Where(i => i.Type == "PRODUCT").ToList();
            foreach (var vItem in vMenu.Items)
            {
                vItem.Children = vItem.Children.Where(c => c.MenuId == vMenu.Id).ToList();
            }
            return vMenu;
        }
    }
}
