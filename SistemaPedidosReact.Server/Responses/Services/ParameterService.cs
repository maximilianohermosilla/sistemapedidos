using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class ParameterService: IParameterService
    {
        private readonly IParameterRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public ParameterService(IParameterRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<ParameterReadDTO> Create(ParameterCreateDTO pParameter)
        {
            try
            {
                var vParameter = vGblMapper.Map<Parameter>(pParameter);
                var vParameterCreada = vGblRepository.Create(vParameter);

                return vGblMapper.Map<ParameterReadDTO>(vParameterCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ParameterReadDTO> Update(ParameterCreateDTO pParameter)
        {
            try
            {
                var vParameter = vGblRepository.GetByKey(pParameter.Key);

                if (vParameter == null)
                {
                    vGblRepository.Create(vGblMapper.Map<Parameter>(pParameter));
                }
                else
                {
                    vParameter.Value = pParameter.Value;
                    vGblRepository.SaveChanges();
                }

                return vGblMapper.Map<ParameterReadDTO>(vParameter);
            }
            catch (Exception ex)
            {
                return null;
            }
        }


        public async Task<IEnumerable<ParameterReadDTO>> GetAll()
        {
            try
            {
                var vParameters = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<ParameterReadDTO>>(vParameters);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ParameterReadDTO?> GetById(int pId)
        {
            try
            {
                var vParameter = vGblRepository.GetById(pId);

                return vGblMapper.Map<ParameterReadDTO>(vParameter)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ParameterReadDTO?> GetByKey(string pKey)
        {
            try
            {
                var vParameter = vGblRepository.GetByKey(pKey);

                return vGblMapper.Map<ParameterReadDTO>(vParameter)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
