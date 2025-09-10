using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class ItemService: IItemService
    {
        private readonly IItemRepository vGblRepository;
        private readonly IItemRepository vGblItemRepository;
        private readonly IMapper vGblMapper;

        public ItemService(IItemRepository pRepository, IItemRepository pItemRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblItemRepository = pItemRepository;
            vGblMapper = pMapper;
        }

        public async Task<ItemReadDTO> Create(ItemCreateDTO pItem)
        {
            try
            {
                var vItem = vGblMapper.Map<Item>(pItem);
                var vItemCreada = vGblRepository.Create(vItem);

                return vGblMapper.Map<ItemReadDTO>(vItemCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<ItemReadDTO>> GetAll()
        {
            try
            {
                var vItems = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<ItemReadDTO>>(vItems);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<ItemReadDTO?> GetById(int pId)
        {
            try
            {
                var vItem = vGblRepository.GetById(pId);

                return vGblMapper.Map<ItemReadDTO>(vItem)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
