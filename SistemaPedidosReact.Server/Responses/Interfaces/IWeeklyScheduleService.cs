using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IWeeklyScheduleService
    {
        Task<WeeklyScheduleReadDTO?> Create(WeeklyScheduleCreateDTO pWeeklySchedule);
        Task<WeeklyScheduleReadDTO?> Update(WeeklyScheduleCreateDTO pWeeklySchedule);
        Task<IEnumerable<WeeklyScheduleReadDTO>> GetAll();
        Task<WeeklyScheduleReadDTO?> GetById(int pId);
        Task<WeeklyScheduleReadDTO?> GetByDayWeek(int pDayWeek);
        Task<bool> IsOpen(DateTime pDate, bool pIsScheduledOrder = false);
    }
}
