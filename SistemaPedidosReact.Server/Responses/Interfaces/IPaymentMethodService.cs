using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IPaymentMethodService
    {
        Task<PaymentMethodReadDTO?> Create(PaymentMethodCreateDTO pPaymentMethod);
        Task<IEnumerable<PaymentMethodReadDTO>> GetAll();
        Task<PaymentMethodReadDTO?> GetById(int pId);
    }
}
