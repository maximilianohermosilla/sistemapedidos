using SistemaPedidosReact.Server.DTOs;

namespace SistemaPedidosReact.Server.Responses.Interfaces
{
    public interface IParameterService
    {
        Task<ParameterReadDTO?> Create(ParameterCreateDTO pParameter);
        Task<ParameterReadDTO?> Update(ParameterCreateDTO pParameter);
        Task<IEnumerable<ParameterReadDTO>> GetAll();
        Task<ParameterReadDTO?> GetById(int pId);
        Task<ParameterReadDTO?> GetByKey(string pKey);
    }
}
