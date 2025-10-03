using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;
using System.Text.Json;
using System;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly IMenuService vGblService;
        private readonly IStoreService vGblStoreService;
        private readonly IUserService vGblUserService;
        private readonly IParameterService vGblParameterService;

        public readonly string UPDATE_MENU = "UPDATE MENU";
        public readonly string SI = "SI";
        public readonly string NO = "NO";

        public MenuController(IMenuService pService, IStoreService pStoreService, IUserService pUserService, IParameterService pParameterService)
        {
            vGblService = pService;
            vGblStoreService = pStoreService;
            vGblUserService = pUserService;
            vGblParameterService = pParameterService;
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

                Console.WriteLine("Crear Menú");
                Console.WriteLine(JsonSerializer.Serialize(pMenu));

                var vParameterUpdateMenu = await vGblParameterService.GetByKey(UPDATE_MENU);
                if (vParameterUpdateMenu != null && vParameterUpdateMenu.Value == SI)
                {
                    pMenu.StoreId = vStore.Id.ToString();
                    var vMenu = await vGblService.CreateMenuPOS(pMenu);

                    if (vMenu == null)
                    {
                        Console.WriteLine("La estructura del menú es inválida");
                        return BadRequest(new ResponseMessage() { Message = "La estructura del menú es inválida" });
                    }

                    await vGblParameterService.Update(new ParameterCreateDTO() { Id = 0, Key = UPDATE_MENU, Value = NO });
                    Console.WriteLine("Menú actualizado y listo para ser validado");
                    return Ok(new ResponseMessage() { Message = "Menú actualizado y listo para ser validado" });
                }
                else
                {
                    Console.WriteLine("Menú sin cambios");
                    return Ok(new ResponseMessage() { Message = "Menú sin cambios" });
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        [Route("[action]")]
        public async Task<ActionResult<MenuReadDTO>> Save(MenuCreatePOS pMenu)
        {
            try
            {
                return await CreateMenuPOS(pMenu);
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

                Console.WriteLine($"Login {pUserLogin.UserName}: {DateTime.Now.ToLongTimeString()}");

                if (vUser == null)
                {
                    Console.WriteLine("Credenciales incorrectas");
                    return NotFound(new UserLoginReadDTO() { Mensaje = "Credenciales incorrectas" });
                }

                Console.WriteLine("Usuario registrado correctamente");
                return Ok(new UserLoginReadDTO() { Mensaje = "Usuario registrado correctamente", Token = vUser.Token });
            }
            catch (Exception ex)
            {
                return BadRequest(new UserLoginReadDTO() { Mensaje = ex.Message });
            }
        }
    }
}
