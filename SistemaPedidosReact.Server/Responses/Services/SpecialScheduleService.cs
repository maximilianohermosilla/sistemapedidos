using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class SpecialScheduleService : ISpecialScheduleService
    {
        private readonly ISpecialScheduleRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public SpecialScheduleService(ISpecialScheduleRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<SpecialScheduleReadDTO> Create(SpecialScheduleCreateDTO pSpecialSchedule)
        {
            try
            {
                var vSpecialSchedule = vGblMapper.Map<SpecialSchedule>(pSpecialSchedule);
                var vSpecialScheduleCreada = vGblRepository.Create(vSpecialSchedule);

                return vGblMapper.Map<SpecialScheduleReadDTO>(vSpecialScheduleCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<SpecialScheduleReadDTO> Update(SpecialScheduleCreateDTO pSpecialSchedule)
        {
            try
            {
                var vSpecialSchedule = vGblRepository.GetById(pSpecialSchedule.Id);

                if (vSpecialSchedule == null)
                {
                    vGblRepository.Create(vGblMapper.Map<SpecialSchedule>(pSpecialSchedule));
                }
                else
                {
                    vSpecialSchedule = vGblMapper.Map<SpecialScheduleCreateDTO, SpecialSchedule>(pSpecialSchedule, vSpecialSchedule);
                    vGblRepository.SaveChanges();
                }

                return vGblMapper.Map<SpecialScheduleReadDTO>(vSpecialSchedule);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public async Task<IEnumerable<SpecialScheduleReadDTO>> GetAll()
        {
            try
            {
                var vSpecialSchedules = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<SpecialScheduleReadDTO>>(vSpecialSchedules);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<SpecialScheduleReadDTO?> GetById(int pId)
        {
            try
            {
                var vSpecialSchedule = vGblRepository.GetById(pId);

                return vGblMapper.Map<SpecialScheduleReadDTO>(vSpecialSchedule)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<SpecialScheduleReadDTO?> GetByDate(DateTime pDate)
        {
            try
            {
                var vSpecialSchedule = vGblRepository.GetByDate(pDate);

                return vGblMapper.Map<SpecialScheduleReadDTO>(vSpecialSchedule)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
