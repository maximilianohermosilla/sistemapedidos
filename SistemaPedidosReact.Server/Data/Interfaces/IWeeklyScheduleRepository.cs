using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IWeeklyScheduleRepository
    {
        bool SaveChanges();
        IEnumerable<WeeklySchedule> GetAll();
        WeeklySchedule GetById(int pId);
        WeeklySchedule GetByDayWeek(int pDayWeek);
        WeeklySchedule Create(WeeklySchedule pParameter);
    }
}
