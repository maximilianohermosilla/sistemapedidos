using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface ISpecialScheduleService
    {
        Task<SpecialScheduleReadDTO?> Create(SpecialScheduleCreateDTO pSpecialSchedule);
        Task<SpecialScheduleReadDTO?> Update(SpecialScheduleCreateDTO pSpecialSchedule);
        Task<IEnumerable<SpecialScheduleReadDTO>> GetAll();
        Task<SpecialScheduleReadDTO?> GetById(int pId);
        Task<SpecialScheduleReadDTO?> GetByDate(DateTime pDate);
    }
}
