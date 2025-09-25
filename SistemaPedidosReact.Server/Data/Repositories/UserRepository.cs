using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class UserRepository: IUserRepository
    {
        private readonly AppDbContext vGblContext;

        public UserRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public User Create(User pUser)
        {
            vGblContext.Users.Add(pUser);
            vGblContext.SaveChanges();

            return pUser;
        }

        public IEnumerable<User> GetAll()
        {
            return vGblContext.Users.ToList();
        }

        public User GetById(int pId)
        {
            return vGblContext.Users.FirstOrDefault(e => e.Id == pId)!;
        }

        public User GetByUserNamePassword(string pUserName, string pPassword)
        {
            return vGblContext.Users.FirstOrDefault(e => e.UserName == pUserName && e.Password == pPassword)!;
        }
    }
}
