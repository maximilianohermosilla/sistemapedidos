using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Interfaces
{
    public interface IStoreRepository
    {
        bool SaveChanges();
        IEnumerable<Store> GetAll();
        Store GetById(int pId);
        Store GetByInternalId(string pInternalId);
        Store GetByExternalId(string pExternalId);
        Store Create(Store pStore);
    }
}
