using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class CustomerService: ICustomerService
    {
        private readonly ICustomerRepository vGblRepository;
        private readonly ICustomerRepository vGblCustomerRepository;
        private readonly IMapper vGblMapper;

        public CustomerService(ICustomerRepository pRepository, ICustomerRepository pCustomerRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblCustomerRepository = pCustomerRepository;
            vGblMapper = pMapper;
        }

        public async Task<CustomerReadDTO> Create(CustomerCreateDTO pCustomer)
        {
            try
            {
                var vCustomer = vGblMapper.Map<Customer>(pCustomer);
                var vCustomerCreada = vGblRepository.Create(vCustomer);

                return vGblMapper.Map<CustomerReadDTO>(vCustomerCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<CustomerReadDTO>> GetAll()
        {
            try
            {
                var vCustomers = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<CustomerReadDTO>>(vCustomers);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<CustomerReadDTO?> GetById(int pId)
        {
            try
            {
                var vCustomer = vGblRepository.GetById(pId);

                return vGblMapper.Map<CustomerReadDTO>(vCustomer)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<CustomerReadDTO?> GetByEmailOrPhone(string pEmail, string pPhone)
        {
            try
            {
                var vCustomer = vGblRepository.GetByEmailOrPhone(pEmail, pPhone);

                return vGblMapper.Map<CustomerReadDTO>(vCustomer)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }        
    }
}
