using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class WeeklyScheduleService : IWeeklyScheduleService
    {
        private readonly IWeeklyScheduleRepository vGblRepository;
        private readonly ISpecialScheduleRepository vGblSpecialRepository;
        private readonly IMapper vGblMapper;

        public WeeklyScheduleService(IWeeklyScheduleRepository pRepository, ISpecialScheduleRepository pSpecialRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblSpecialRepository = pSpecialRepository;
            vGblMapper = pMapper;
        }

        public async Task<WeeklyScheduleReadDTO> Create(WeeklyScheduleCreateDTO pWeeklySchedule)
        {
            try
            {
                var vWeeklySchedule = vGblMapper.Map<WeeklySchedule>(pWeeklySchedule);
                var vWeeklyScheduleCreada = vGblRepository.Create(vWeeklySchedule);

                return vGblMapper.Map<WeeklyScheduleReadDTO>(vWeeklyScheduleCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<WeeklyScheduleReadDTO> Update(WeeklyScheduleCreateDTO pWeeklySchedule)
        {
            try
            {
                var vWeeklySchedule = vGblRepository.GetById(pWeeklySchedule.Id);

                if (vWeeklySchedule == null)
                {
                    vGblRepository.Create(vGblMapper.Map<WeeklySchedule>(pWeeklySchedule));
                }
                else
                {
                    vWeeklySchedule = vGblMapper.Map<WeeklyScheduleCreateDTO, WeeklySchedule>(pWeeklySchedule, vWeeklySchedule);
                    vGblRepository.SaveChanges();
                }

                return vGblMapper.Map<WeeklyScheduleReadDTO>(vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public async Task<IEnumerable<WeeklyScheduleReadDTO>> GetAll()
        {
            try
            {
                var vWeeklySchedules = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<WeeklyScheduleReadDTO>>(vWeeklySchedules);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<WeeklyScheduleReadDTO?> GetById(int pId)
        {
            try
            {
                var vWeeklySchedule = vGblRepository.GetById(pId);

                return vGblMapper.Map<WeeklyScheduleReadDTO>(vWeeklySchedule)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<WeeklyScheduleReadDTO?> GetByDayWeek(int pDayWeek)
        {
            try
            {
                var vWeeklySchedule = vGblRepository.GetByDayWeek(pDayWeek);

                return vGblMapper.Map<WeeklyScheduleReadDTO>(vWeeklySchedule)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> IsOpen(DateTime pDate, bool pIsScheduledOrder = false)
        {
            try
            {
                var vException = vGblSpecialRepository.GetByDate(pDate);

                if (vException != null)
                {
                    if (!vException.IsOpen) return false;

                    if (pIsScheduledOrder)
                    {
                        return TimeOnly.FromDateTime(pDate) >= vException.OpeningScheduleTime
                        && TimeOnly.FromDateTime(pDate) <= vException.ClosingScheduleTime;
                    }
                    else
                    {
                        return TimeOnly.FromDateTime(pDate) >= vException.OpeningTime
                        && TimeOnly.FromDateTime(pDate) <= vException.ClosingTime;
                    }                    
                }

                var vDayOfWeek = (int)pDate.DayOfWeek;
                var vWeeklySchedule = vGblRepository.GetByDayWeek(vDayOfWeek);

                if (vWeeklySchedule == null || !vWeeklySchedule.IsOpen) return false;

                if (pIsScheduledOrder)
                {
                    return TimeOnly.FromDateTime(pDate) >= vWeeklySchedule.OpeningScheduleTime
                    && TimeOnly.FromDateTime(pDate) <= vWeeklySchedule.ClosingScheduleTime;
                }
                else
                {
                    return TimeOnly.FromDateTime(pDate) >= vWeeklySchedule.OpeningTime
                    && TimeOnly.FromDateTime(pDate) <= vWeeklySchedule.ClosingTime;
                }

            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<DayScheduleReadDTO?> GetDaySchedule(DateTime pDate)
        {
            try
            {
                var vException = vGblSpecialRepository.GetByDate(pDate);

                if (vException != null)
                {
                    var vDaySchedule = new DayScheduleReadDTO()
                    {
                        IsException = true,
                        Description = vException.Description,
                        IsOpen = vException.IsOpen,
                        OpeningTime = vException.OpeningTime,
                        ClosingTime = vException.ClosingTime,
                        OpeningScheduleTime = vException.OpeningScheduleTime,
                        ClosingScheduleTime = vException.ClosingScheduleTime
                    };

                    return vDaySchedule;
                }
                else
                {
                    var vDayOfWeek = (int)pDate.DayOfWeek;
                    var vWeeklySchedule = vGblRepository.GetByDayWeek(vDayOfWeek);

                    var vDaySchedule = new DayScheduleReadDTO()
                    {
                        IsException = false,
                        Description = vWeeklySchedule.DayWeek,
                        IsOpen = vWeeklySchedule.IsOpen,
                        OpeningTime = vWeeklySchedule.OpeningTime,
                        ClosingTime = vWeeklySchedule.ClosingTime,
                        OpeningScheduleTime = vWeeklySchedule.OpeningScheduleTime,
                        ClosingScheduleTime = vWeeklySchedule.ClosingScheduleTime
                    };

                    return vDaySchedule;
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
