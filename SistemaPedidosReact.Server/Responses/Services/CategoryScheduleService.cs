using AutoMapper;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class CategoryScheduleService : ICategoryScheduleService
    {
        private readonly ICategoryScheduleRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public CategoryScheduleService(ICategoryScheduleRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<IEnumerable<CategoryScheduleReadDTO>> GetAll()
        {
            try
            {
                var vSchedules = vGblRepository.GetAll();
                return vGblMapper.Map<IEnumerable<CategoryScheduleReadDTO>>(vSchedules);
            }
            catch (Exception)
            {
                return null!;
            }
        }

        public async Task<CategoryScheduleReadDTO?> GetById(int pId)
        {
            try
            {
                var vSchedule = vGblRepository.GetById(pId);
                return vGblMapper.Map<CategoryScheduleReadDTO>(vSchedule);
            }
            catch (Exception)
            {
                return null;
            }
        }

        public async Task<IEnumerable<CategoryScheduleReadDTO>> GetAllByCategoryId(int pCategoryId)
        {
            try
            {
                var vSchedules = vGblRepository.GetAllByCategoryId(pCategoryId);
                return vGblMapper.Map<IEnumerable<CategoryScheduleReadDTO>>(vSchedules);
            }
            catch (Exception)
            {
                return null!;
            }
        }

        public async Task<CategoryScheduleReadDTO> Create(CategoryScheduleCreateDTO pCategorySchedule)
        {
            try
            {
                var vCategorySchedule = vGblMapper.Map<CategorySchedule>(pCategorySchedule);
                var vCreated = vGblRepository.Create(vCategorySchedule);

                return vGblMapper.Map<CategoryScheduleReadDTO>(vCreated);
            }
            catch (Exception)
            {
                return null!;
            }
        }

        public async Task<CategoryScheduleReadDTO> Update(CategoryScheduleCreateDTO pCategorySchedule)
        {
            try
            {
                var vSchedule = vGblRepository.GetById(pCategorySchedule.Id);

                if (vSchedule == null)
                {
                    vSchedule = vGblRepository.Create(vGblMapper.Map<CategorySchedule>(pCategorySchedule));
                }
                else
                {
                    vSchedule = vGblMapper.Map<CategoryScheduleCreateDTO, CategorySchedule>(pCategorySchedule, vSchedule);
                    vGblRepository.SaveChanges();
                }

                return vGblMapper.Map<CategoryScheduleReadDTO>(vSchedule);
            }
            catch (Exception)
            {
                return null!;
            }
        }

        public async Task<bool?> Delete(int pId)
        {
            try
            {
                var vDeleted = vGblRepository.Delete(pId);
                return vDeleted;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
