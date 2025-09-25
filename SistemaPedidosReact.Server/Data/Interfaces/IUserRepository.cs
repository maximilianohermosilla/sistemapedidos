using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IUserRepository
    {
        bool SaveChanges();
        IEnumerable<User> GetAll();
        User GetById(int pId);
        User GetByUserNamePassword(string pUserName, string pPassword);
        User Create(User pUser);
    }
}
