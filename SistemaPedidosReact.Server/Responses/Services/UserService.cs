using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Helpers;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository vGblRepository;
        private readonly IConfiguration vGblConfiguration;
        private readonly IMapper vGblMapper;

        public UserService(IUserRepository pRepository, IConfiguration pConfiguration, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblConfiguration = pConfiguration;
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
                var vUserReadDTO = vGblMapper.Map<UserReadDTO>(vUser)!;

                if (vUserReadDTO == null)
                {
                    return vUserReadDTO;
                }

                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, vUserReadDTO.UserName),
                    new Claim(ClaimTypes.Name, $"{vUserReadDTO.Name} {vUserReadDTO.LastName}"),
                    new Claim(ClaimTypes.Role, "User")
                };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(vGblConfiguration["Jwt:Key"]!));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

                var token = new JwtSecurityToken(
                    issuer: vGblConfiguration["Jwt:Issuer"],
                    audience: vGblConfiguration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddDays(365),
                    signingCredentials: creds
                );

                vUserReadDTO!.Token = new JwtSecurityTokenHandler().WriteToken(token); ;

                return vUserReadDTO;
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
