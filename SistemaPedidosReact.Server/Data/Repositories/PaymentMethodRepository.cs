using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class PaymentMethodRepository: IPaymentMethodRepository
    {
        private readonly AppDbContext vGblContext;

        public PaymentMethodRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }
        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public PaymentMethod Create(PaymentMethod pPaymentMethod)
        {
            vGblContext.PaymentMethods.Add(pPaymentMethod);
            vGblContext.SaveChanges();

            return pPaymentMethod;
        }

        public IEnumerable<PaymentMethod> GetAll()
        {
            return vGblContext.PaymentMethods.ToList();
        }

        public PaymentMethod GetById(int pId)
        {
            return vGblContext.PaymentMethods.FirstOrDefault(e => e.Id == pId)!;
        }
    }
}
