using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class PaymentMethodService: IPaymentMethodService
    {
        private readonly IPaymentMethodRepository vGblRepositorio;
        private readonly IMapper vGblMapper;

        public PaymentMethodService(IPaymentMethodRepository pRepositorio, IMapper pMapper)
        {
            vGblRepositorio = pRepositorio;
            vGblMapper = pMapper;
        }

        public async Task<PaymentMethodReadDTO> Create(PaymentMethodCreateDTO pPaymentMethod)
        {
            try
            {
                var vPaymentMethod = vGblMapper.Map<PaymentMethod>(pPaymentMethod);
                var vPaymentMethodCreada = vGblRepositorio.Create(vPaymentMethod);

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
                var vPaymentMethods = vGblRepositorio.GetAll();

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
                var vPaymentMethod = vGblRepositorio.GetById(pId);

                return vGblMapper.Map<PaymentMethodReadDTO>(vPaymentMethod)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
