using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IPaymentMethodRepository
    {
        bool SaveChanges();
        IEnumerable<PaymentMethod> GetAll();
        PaymentMethod GetById(int pId);
        PaymentMethod Create(PaymentMethod pPaymentMethod);
    }
}
