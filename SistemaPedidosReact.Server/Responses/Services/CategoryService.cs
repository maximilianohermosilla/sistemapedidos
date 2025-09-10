using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class CategoryService: ICategoryService
    {
        private readonly ICategoryRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public CategoryService(ICategoryRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<CategoryReadDTO> Create(CategoryCreateDTO pCategory)
        {
            try
            {
                var vCategory = vGblMapper.Map<Category>(pCategory);
                var vCategoryCreada = vGblRepository.Create(vCategory);

                return vGblMapper.Map<CategoryReadDTO>(vCategoryCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<CategoryReadDTO>> GetAll()
        {
            try
            {
                var vCategorys = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<CategoryReadDTO>>(vCategorys);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<CategoryReadDTO?> GetById(int pId)
        {
            try
            {
                var vCategory = vGblRepository.GetById(pId);

                return vGblMapper.Map<CategoryReadDTO>(vCategory)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
