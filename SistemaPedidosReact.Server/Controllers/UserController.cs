using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService vGblService;

        public UserController(IUserService pService)
        {
            vGblService = pService;
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<UserReadDTO>> Create(UserCreateDTO pUser)
        {
            try
            {
                var vUser = await vGblService.Create(pUser);

                return Created("", vUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
