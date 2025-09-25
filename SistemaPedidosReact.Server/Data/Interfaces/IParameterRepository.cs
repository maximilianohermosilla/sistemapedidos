using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IParameterRepository
    {
        bool SaveChanges();
        IEnumerable<Parameter> GetAll();
        Parameter GetById(int pId);
        Parameter GetByKey(string pKey);
        Parameter Create(Parameter pParameter);
    }
}
