using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository vGblRepository;
        private readonly IOrderRepository vGblOrderRepository;
        private readonly IMapper vGblMapper;

        public OrderService(IOrderRepository pRepository, IOrderRepository pOrderRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblOrderRepository = pOrderRepository;
            vGblMapper = pMapper;
        }

        public async Task<OrderReadDTO> Create(OrderCreateDTO pOrder)
        {
            try
            {
                var vOrder = vGblMapper.Map<Order>(pOrder);
                var vOrderCreada = vGblRepository.Create(vOrder);

                return vGblMapper.Map<OrderReadDTO>(vOrderCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<OrderReadDTO>> GetAll()
        {
            try
            {
                var vOrders = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<OrderReadDTO>>(vOrders);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<OrderReadPOS>> GetAllPendingsByStore(int? pStoreId)
        {
            try
            {
                var vOrders = vGblRepository.GetAllPendingsByStore(pStoreId);

                return vGblMapper.Map<IEnumerable<OrderReadPOS>>(vOrders);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<OrderReadDTO?> GetById(int pId)
        {
            try
            {
                var vOrder = vGblRepository.GetById(pId);

                return vGblMapper.Map<OrderReadDTO>(vOrder)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
