using Microsoft.AspNetCore.Authorization;
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

                if (vMenu == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Menú no encontrado" });
                }

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

                if (vMenu == null)
                {
                    return NotFound(new ResponseMessage() { Message = "No existe ningún menú disponible" });
                }

                return Ok(vMenu);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MenuReadDTO>> CreateMenuPOS(MenuCreatePOS pMenu)
        {
            try
            {
                var vStore = await vGblStoreService.GetByExternalId(pMenu.StoreId);

                if (vStore == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }
                else
                {
                    pMenu.StoreId = vStore.Id.ToString();
                }

                var vMenu = await vGblService.CreateMenuPOS(pMenu);

                if (vMenu == null)
                {
                    return BadRequest(new ResponseMessage() { Message = "La estructura del menú es inválida" });
                }

                return Ok(new ResponseMessage() { Message = "Menú actualizado y listo para ser validado" });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("[action]")]
        public async Task<ActionResult<UserReadDTO>> Login([FromBody] UserLoginDTO pUserLogin)
        {
            try
            {
                var vUser = await vGblUserService.GetByUserNamePassword(pUserLogin.UserName, pUserLogin.Password);

                if (vUser == null)
                {
                    return NotFound(new UserLoginReadDTO() { Mensaje = "Credenciales incorrectas" });
                }

                return Ok(new UserLoginReadDTO() { Mensaje = "Usuario registrado correctamente", Token = vUser.Token });
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
