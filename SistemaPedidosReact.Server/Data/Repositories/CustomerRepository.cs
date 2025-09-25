using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class CustomerRepository: ICustomerRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public CustomerRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Customer Create(Customer pCustomer)
        {
            vGblContext.Customers.Add(pCustomer);
            vGblContext.SaveChanges();

            return pCustomer;
        }

        public IEnumerable<Customer> GetAll()
        {
            return vGblContext.Customers.ToList();
        }

        public Customer GetById(int pId)
        {
            return vGblContext.Customers.FirstOrDefault(e => e.Id == pId)!;
        }

        public Customer GetByEmailOrPhone(string pEmail, string pPhone)
        {
            return vGblContext.Customers.FirstOrDefault(e => e.Email == pEmail || e.PhoneNumber == pPhone)!;
        }
    }
}
