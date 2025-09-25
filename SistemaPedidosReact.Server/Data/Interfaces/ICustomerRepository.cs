using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface ICustomerRepository
    {
        bool SaveChanges();
        IEnumerable<Customer> GetAll();
        Customer GetById(int pId);
        Customer GetByEmailOrPhone(string pEmail, string pPhone);
        Customer Create(Customer pCustomer);
    }
}
