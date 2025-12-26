using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class WeeklyScheduleRepository : IWeeklyScheduleRepository
    {
        private readonly AppDbContext vGblContext;

        public WeeklyScheduleRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }
        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public WeeklySchedule Create(WeeklySchedule pWeeklySchedule)
        {
            vGblContext.WeeklySchedules.Add(pWeeklySchedule);
            vGblContext.SaveChanges();

            return pWeeklySchedule;
        }

        public IEnumerable<WeeklySchedule> GetAll()
        {
            return vGblContext.WeeklySchedules.ToList();
        }

        public WeeklySchedule GetById(int pId)
        {
            return vGblContext.WeeklySchedules.FirstOrDefault(e => e.Id == pId)!;
        }

        public WeeklySchedule GetByDayWeek(int pDayWeek)
        {
            return vGblContext.WeeklySchedules.FirstOrDefault(e => e.DayCode == pDayWeek)!;
        }
    }
}
