using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class PaymentMethodService: IPaymentMethodService
    {
        private readonly IPaymentMethodRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public PaymentMethodService(IPaymentMethodRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<PaymentMethodReadDTO> Create(PaymentMethodCreateDTO pPaymentMethod)
        {
            try
            {
                var vPaymentMethod = vGblMapper.Map<PaymentMethod>(pPaymentMethod);
                var vPaymentMethodCreada = vGblRepository.Create(vPaymentMethod);

                return vGblMapper.Map<PaymentMethodReadDTO>(vPaymentMethodCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<PaymentMethodReadDTO>> GetAll()
        {
            try
            {
                var vPaymentMethods = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<PaymentMethodReadDTO>>(vPaymentMethods);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<PaymentMethodReadDTO?> GetById(int pId)
        {
            try
            {
                var vPaymentMethod = vGblRepository.GetById(pId);

                return vGblMapper.Map<PaymentMethodReadDTO>(vPaymentMethod)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
