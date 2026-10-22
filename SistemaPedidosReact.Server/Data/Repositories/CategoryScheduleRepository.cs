using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class CategoryScheduleRepository : ICategoryScheduleRepository
    {
        private readonly AppDbContext vGblContext;

        public CategoryScheduleRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public CategorySchedule Create(CategorySchedule pCategorySchedule)
        {
            vGblContext.CategorySchedules.Add(pCategorySchedule);
            vGblContext.SaveChanges();

            return pCategorySchedule;
        }

        public IEnumerable<CategorySchedule> GetAll()
        {
            return vGblContext.CategorySchedules.Include(c => c.Category).ToList();
        }

        public CategorySchedule? GetById(int pId)
        {
            return vGblContext.CategorySchedules.Include(c => c.Category).FirstOrDefault(e => e.Id == pId);
        }

        public IEnumerable<CategorySchedule> GetAllByCategoryId(int pCategoryId)
        {
            return vGblContext.CategorySchedules.Include(c => c.Category).Where(e => e.CategoryId == pCategoryId).ToList();
        }

        public bool Delete(int pId)
        {
            try
            {
                var vCategorySchedule = vGblContext.CategorySchedules.FirstOrDefault(e => e.Id == pId);
                if (vCategorySchedule == null)
                    return false;

                vGblContext.CategorySchedules.Remove(vCategorySchedule);
                vGblContext.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
