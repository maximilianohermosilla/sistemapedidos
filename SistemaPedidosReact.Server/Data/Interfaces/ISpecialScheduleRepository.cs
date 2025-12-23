using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface ISpecialScheduleRepository
    {
        bool SaveChanges();
        IEnumerable<SpecialSchedule> GetAll();
        SpecialSchedule GetById(int pId);
        SpecialSchedule GetByDate(DateTime pDate);
        SpecialSchedule Create(SpecialSchedule pParameter);
    }
}
