using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class CategoryRepository: ICategoryRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public CategoryRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Category Create(Category pCategory)
        {
            vGblContext.Categories.Add(pCategory);
            vGblContext.SaveChanges();

            return pCategory;
        }

        public IEnumerable<Category> GetAll()
        {
            return vGblContext.Categories.ToList();
        }

        public Category GetById(int pId)
        {
            return vGblContext.Categories.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
