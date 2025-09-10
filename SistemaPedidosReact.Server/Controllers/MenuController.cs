using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService vGblService;
        private readonly IStoreService vGblStoreService;

        public MenuController(IMenuService pService, IStoreService pStoreService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
        }

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<IEnumerable<MenuReadDTO>>> GetAll()
        {
            try
            {
                var vMenus = await vGblService.GetAll();

                return Ok(vMenus);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MenuReadDTO>> GetById(int id)
        {
            try
            {
                var vMenu = await vGblService.GetById(id);

                return Ok(vMenu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<MenuReadDTO>> CreateMenuPOS(MenuCreatePOS pMenu)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(pMenu.StoreId);

                if (vStore == null)
                {
                    return BadRequest("Store inexistente");
                }
                else
                {
                    pMenu.StoreId = vStore.Id.ToString();
                }

                var vMenu = await vGblService.CreateMenuPOS(pMenu);

                if (vMenu == null)
                {
                    return BadRequest("Ocurrió un error al actualizar el menú");
                }

                return Created("", vMenu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<MenuReadDTO>> Create(MenuCreateDTO pMenu)
        {
            try
            {
                var vMenu = await vGblService.Create(pMenu);

                return Created("", vMenu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
