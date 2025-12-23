using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class SpecialScheduleRepository: ISpecialScheduleRepository
    {
        private readonly AppDbContext vGblContext;

        public SpecialScheduleRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }
        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public SpecialSchedule Create(SpecialSchedule pSpecialSchedule)
        {
            vGblContext.SpecialSchedules.Add(pSpecialSchedule);
            vGblContext.SaveChanges();

            return pSpecialSchedule;
        }

        public IEnumerable<SpecialSchedule> GetAll()
        {
            return vGblContext.SpecialSchedules.ToList();
        }

        public SpecialSchedule GetById(int pId)
        {
            return vGblContext.SpecialSchedules.FirstOrDefault(e => e.Id == pId)!;
        }

        public SpecialSchedule GetByDate(DateTime pDate)
        {
            return vGblContext.SpecialSchedules.FirstOrDefault(e => DateOnly.FromDateTime(e.Date) == DateOnly.FromDateTime(pDate))!;
        }
    }
}
