using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface ICustomerService
    {
        Task<CustomerReadDTO?> Create(CustomerCreateDTO pCustomer);
        Task<IEnumerable<CustomerReadDTO>> GetAll();
        Task<CustomerReadDTO?> GetById(int pId);
        Task<CustomerReadDTO?> GetByEmailOrPhone(string pEmail, string pPhone);
    }
}
