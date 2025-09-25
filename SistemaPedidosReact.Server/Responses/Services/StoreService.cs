using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class StoreService: IStoreService
    {
        private readonly IStoreRepository vGblRepository;
        private readonly IStoreRepository vGblStoreRepository;
        private readonly IMapper vGblMapper;

        public StoreService(IStoreRepository pRepository, IStoreRepository pStoreRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblStoreRepository = pStoreRepository;
            vGblMapper = pMapper;
        }

        public async Task<StoreReadDTO> Create(StoreCreateDTO pStore)
        {
            try
            {
                var vStore = vGblMapper.Map<Store>(pStore);
                var vStoreCreada = vGblRepository.Create(vStore);

                return vGblMapper.Map<StoreReadDTO>(vStoreCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<StoreReadDTO>> GetAll()
        {
            try
            {
                var vStores = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<StoreReadDTO>>(vStores);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<StoreReadDTO?> GetById(int pId)
        {
            try
            {
                var vStore = vGblRepository.GetById(pId);

                return vGblMapper.Map<StoreReadDTO>(vStore)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<StoreReadDTO?> GetByInternalId(string pInternalId)
        {
            try
            {
                var vStore = vGblRepository.GetByInternalId(pInternalId);

                return vGblMapper.Map<StoreReadDTO>(vStore)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<StoreReadDTO?> GetByExternalId(string pExternalId)
        {
            try
            {
                var vStore = vGblRepository.GetByExternalId(pExternalId);

                return vGblMapper.Map<StoreReadDTO>(vStore)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
