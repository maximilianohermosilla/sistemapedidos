using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Helpers;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class UserService: IUserService
    {
        private readonly IUserRepository vGblRepository;
        private readonly IMapper vGblMapper;

        public UserService(IUserRepository pRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblMapper = pMapper;
        }

        public async Task<UserReadDTO> Create(UserCreateDTO pUser)
        {
            try
            {
                var vUser = vGblMapper.Map<User>(pUser);
                var vUserCreada = vGblRepository.Create(vUser);

                return vGblMapper.Map<UserReadDTO>(vUserCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<UserReadDTO>> GetAll()
        {
            try
            {
                var vUsers = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<UserReadDTO>>(vUsers);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<UserReadDTO?> GetById(int pId)
        {
            try
            {
                var vUser = vGblRepository.GetById(pId);

                return vGblMapper.Map<UserReadDTO>(vUser)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<UserReadDTO?> GetByUserNamePassword(string pUserName, string pPassword)
        {
            try
            {
                var vUser = vGblRepository.GetByUserNamePassword(pUserName, CryptographyHelper.Encrypt(pPassword));

                return vGblMapper.Map<UserReadDTO>(vUser)!;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
