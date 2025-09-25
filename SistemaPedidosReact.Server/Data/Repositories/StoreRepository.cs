using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data.Repositories
{
    public class StoreRepository: IStoreRepository
    {
        private readonly AppDbContext vGblContext;

        public bool SaveChanges()
        {
            return vGblContext.SaveChanges() > 0;
        }

        public StoreRepository(AppDbContext pContext)
        {
            vGblContext = pContext;
        }

        public Store Create(Store pStore)
        {
            vGblContext.Stores.Add(pStore);
            vGblContext.SaveChanges();

            return pStore;
        }

        public IEnumerable<Store> GetAll()
        {
            return vGblContext.Stores.ToList();
        }

        public Store GetById(int pId)
        {
            return vGblContext.Stores.FirstOrDefault(e => e.Id == pId)!;
        }

        public Store GetByInternalId(string pInternalId)
        {
            return vGblContext.Stores.FirstOrDefault(e => e.InternalId == pInternalId)!;
        }

        public Store GetByExternalId(string pExternalId)
        {
            return vGblContext.Stores.FirstOrDefault(e => e.ExternalId == pExternalId)!;
        }
    }
}
