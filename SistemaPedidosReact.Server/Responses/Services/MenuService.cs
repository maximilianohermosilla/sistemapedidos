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

        public async Task<MenuReadDTO?> GetLastMenu()
        {
            try
            {
                var vMenu = vGblRepository.GetLastMenu();

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
                List<Item> vItemsList = new List<Item>();
                var vMenu = vGblMapper.Map<Menu>(pMenu);
                vMenu.Name = $"Menú {DateTime.Now.ToString("yyyy-MM-dd_HH.mm.ss")}";
                //var vItems = vGblMapper.Map<ICollection<Item>>(pMenu.Items);

                foreach (var vItem in pMenu.Items!)
                {
                    Item vItemProcessed = ProcessItemCreatePOS(vItem);
                    if(vItemProcessed != null)
                    {
                        vItemsList.Add(vItemProcessed);
                    }
                }

                vMenu.Items = vItemsList.Where(i => i.Id == 0).ToList();
                var vMenuCreada = vGblRepository.Create(vMenu);

                foreach (var vItem in vItemsList.Where(i => i.Id > 0).ToList())
                {
                    foreach (var vChildren in vItem.Children)
                    {
                        vChildren.MenuId = vMenuCreada.Id;
                    }

                    var vItemDTO = vGblMapper.Map<ItemCreateDTO>(vItem);
                    var vItemDatabase = vGblItemRepository.GetBySku(vItem.Sku);
                    vItemDatabase = vGblMapper.Map<ItemCreateDTO, Item>(vItemDTO, vItemDatabase!);
                    vItemDatabase.MenuId = vMenuCreada.Id;
                    vGblItemRepository.SaveChanges();
                }

                return vGblMapper.Map<MenuReadDTO>(vMenuCreada);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public Item ProcessItemCreatePOS(ItemCreatePOS pItem)
        {
            try
            {
                var vItemDatabase = vGblItemRepository.GetBySku(pItem.Sku);
                pItem.Id = vItemDatabase != null ? vItemDatabase.Id!.ToString() : "0";

                if(vItemDatabase != null)
                    vGblItemRepository.Detach(vItemDatabase!);
                
                var vCategory = vGblCategoryRepository.GetByExternalId(pItem.Category!.Id!);
                if (vCategory == null)
                {
                    vCategory = vGblCategoryRepository.Create(vGblMapper.Map<Category>(pItem.Category));
                }
                else
                {
                    vCategory.Name = pItem.Category.Name;
                    vCategory.MaxQty = (int)pItem.Category.MaxQty!;
                    vCategory.MinQty = (int)pItem.Category.MinQty!;
                    vCategory.SortingPosition = (int)pItem.Category.SortingPosition!;
                    vGblCategoryRepository.SaveChanges();
                }

                pItem.CategoryId = vCategory!.Id;
                pItem.Category = null;

                foreach (var pChildren in pItem!.Children!)
                {
                    var vChildrenDatabase = vGblItemRepository.GetBySku(pChildren!.Sku!);
                    pChildren.Id = vChildrenDatabase != null ? vChildrenDatabase.Id!.ToString() : "0";
                    if (vChildrenDatabase != null)
                        vGblItemRepository.Detach(vChildrenDatabase!);

                    var vCategoryChildren = vGblCategoryRepository.GetByExternalId(pChildren.Category!.Id!);
                    if (vCategoryChildren == null)
                    {
                        vCategoryChildren = vGblCategoryRepository.Create(vGblMapper.Map<Category>(pChildren.Category));
                    }
                    else
                    {
                        vCategoryChildren.Name = pChildren.Category!.Name!;
                        vCategoryChildren.MaxQty = (int)pChildren.Category.MaxQty!;
                        vCategoryChildren.MinQty = (int)pChildren.Category.MinQty!;
                        vCategoryChildren.SortingPosition = (int)pChildren.Category.SortingPosition!;
                        vGblCategoryRepository.SaveChanges();
                    }

                    pChildren.CategoryId = vCategoryChildren!.Id;
                    pChildren.Category = null;
                }

                vItemDatabase = vGblMapper.Map<ItemCreatePOS, Item>(pItem, vItemDatabase!);

                return vItemDatabase;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error procesando item: {pItem.Name}.\n{ex.Message}");
                return null;
            }
        }
    }
}
