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
        private readonly IUserService vGblUserService;

        public MenuController(IMenuService pService, IStoreService pStoreService, IUserService pUserService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
            vGblUserService = pUserService;
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

        [HttpGet]
        [Route("[action]")]
        public async Task<ActionResult<MenuReadDTO>> GetLastMenu()
        {
            try
            {
                var vMenu = await vGblService.GetLastMenu();

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
        public async Task<ActionResult<UserReadDTO>> Login(string pUserName, string pPassword)
        {
            try
            {
                var vUser = await vGblUserService.GetByUserNamePassword(pUserName, pPassword);

                if (vUser == null)
                {
                    return NotFound(new UserLoginReadDTO() { Mensaje = "Credenciales incorrectas" });
                }

                return Ok(new UserLoginReadDTO() { Mensaje = "Usuario registrado correctamente", Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdjNjM0NzNmMGFhMDEyNDM4ZDE3YiIsImlhdCI6MTcyNzcwMjI3MiwiZXhwIjoxNzI3NzA1ODcyfQ.9rT2HaSyFjkOX053A_1LHrdsg1bnC28mFDttbAu3E2g" });
            }
            catch (Exception ex)
            {
                return BadRequest(new UserLoginReadDTO() { Mensaje = ex.Message });
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
