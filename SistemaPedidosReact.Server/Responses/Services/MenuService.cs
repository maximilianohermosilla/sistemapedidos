using AutoMapper;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Responses.Services
{
    public class MenuService: IMenuService
    {
        private readonly IMenuRepository vGblRepository;
        private readonly IItemRepository vGblItemRepository;
        private readonly ICategoryRepository vGblCategoryRepository;
        private readonly IMapper vGblMapper;

        public MenuService(IMenuRepository pRepository, IItemRepository pItemRepository, ICategoryRepository pCategoryRepository, IMapper pMapper)
        {
            vGblRepository = pRepository;
            vGblItemRepository = pItemRepository;
            vGblCategoryRepository = pCategoryRepository;
            vGblMapper = pMapper;
        }

        public async Task<MenuReadDTO> Create(MenuCreateDTO pMenu)
        {
            try
            {
                var vMenu = vGblMapper.Map<Menu>(pMenu);
                var vMenuCreada = vGblRepository.Create(vMenu);

                return vGblMapper.Map<MenuReadDTO>(vMenuCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<IEnumerable<MenuReadDTO>> GetAll()
        {
            try
            {
                var vMenus = vGblRepository.GetAll();

                return vGblMapper.Map<IEnumerable<MenuReadDTO>>(vMenus);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<MenuReadDTO?> GetById(int pId)
        {
            try
            {
                var vMenu = vGblRepository.GetById(pId);

                return vGblMapper.Map<MenuReadDTO>(vMenu)!;                
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<MenuReadDTO> CreateMenuPOS(MenuCreatePOS pMenu)
        {
            try
            {
                var vMenu = vGblMapper.Map<Menu>(pMenu);
                //var vItems = vGblMapper.Map<ICollection<Item>>(pMenu.Items);

                foreach (var vItem in vMenu.Items!)
                {
                    var vCategory = vGblCategoryRepository.GetByExternalId(vItem.Category!.ExternalId!);

                    if(vCategory == null)
                    {
                        vItem.Category.Id = 0;
                        vCategory = vGblCategoryRepository.Create(vItem.Category);
                    }

                    vItem.CategoryId = vCategory!.Id;
                    //vItem.Category!.Id = vCategory.Id;
                    vItem.Category = null;

                    foreach (var vChildren in vItem.Children)
                    {
                        var vCategoryChildren = vGblCategoryRepository.GetByExternalId(vChildren.Category!.ExternalId!);

                        if (vCategoryChildren == null)
                        {
                            vChildren.Category.Id = 0;
                            vCategoryChildren = vGblCategoryRepository.Create(vChildren.Category);
                        }

                        vChildren.CategoryId = vCategoryChildren!.Id;
                        //vChildren.Category!.Id = vCategoryChildren.Id;
                        vChildren.Category = null;
                    }
                }

                var vMenuCreada = vGblRepository.Create(vMenu);

                return vGblMapper.Map<MenuReadDTO>(vMenuCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
