using AutoMapper;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class OrderService: IOrderService
    {
        private readonly IOrderRepository vGblRepository;
        private readonly IOrderRepository vGblOrderRepository;
        private readonly ICustomerRepository vGblCustomerRepository;
        private readonly IMapper vGblMapper;

        public OrderService(IOrderRepository pRepository, IOrderRepository pOrderRepository, ICustomerRepository pCustomerRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblOrderRepository = pOrderRepository;
            vGblCustomerRepository = pCustomerRepository;
            vGblMapper = pMapper;
        }

        public async Task<OrderReadDTO> Create(OrderCreateDTO pOrder)
        {
            try
            {
                var vCustomer = vGblCustomerRepository.GetByEmailOrPhone(pOrder!.Customer!.Email!, pOrder!.Customer!.PhoneNumber!);
                if(vCustomer != null)
                {
                    vCustomer.FirstName = pOrder!.Customer!.FirstName;
                    vCustomer.Email = vCustomer.Email == null || vCustomer.Email == "" ? pOrder!.Customer!.Email : vCustomer.Email;
                    vCustomer.PhoneNumber = vCustomer.PhoneNumber == null || vCustomer.PhoneNumber == "" ? pOrder!.Customer!.PhoneNumber : vCustomer.PhoneNumber;
                    pOrder.CustomerId = vCustomer.Id;
                    pOrder.Customer = null;

                    vGblCustomerRepository.SaveChanges();
                }

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

        
        public async Task<bool?> UpdateState(int? pOrderId, string pState, string pDelay)
        {
            try
            {
                var vOrder = vGblRepository.GetById(Convert.ToInt32(pOrderId));

                if(vOrder == null)
                {
                    return null;
                }

                vOrder.State = pState;
                vOrder.Delay = Convert.ToInt32(pDelay);
                vGblRepository.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool?> CancelItems(int? pOrderId, IEnumerable<OrderCancelItemDTO> pItems)
        {
            try
            {
                var vOrder = vGblRepository.GetById(Convert.ToInt32(pOrderId));

                if (vOrder == null)
                {
                    return null;
                }

                foreach (var vItem in vOrder.OrderDetail!.OrderItems)
                {
                    var vItemCancel = pItems.Where(i => i.Sku == vItem.Item.Sku).FirstOrDefault();
                    if(vItemCancel != null)
                    {
                        var vCantidad = vItem.Quantity - vItemCancel.Cantidad;
                        if(vCantidad > 0)
                        {
                            vItem.Quantity = vCantidad;
                        }
                        else
                        {
                            vOrder.OrderDetail!.OrderItems = vOrder.OrderDetail!.OrderItems.Where(i => i.Item.Sku != vItemCancel.Sku).ToList();
                        }
                    }
                }

                vGblRepository.SaveChanges();

                return true;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
