using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class MenuRepository: IMenuRepository
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
            return vGblContext.Menus.ToList();
        }

        public Menu GetById(int pId)
        {
            return vGblContext.Menus.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
