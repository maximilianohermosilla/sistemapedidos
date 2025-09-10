using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
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

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<UserReadDTO>>> GetAll()
        {
            try
            {
                var vUsers = await vGblService.GetAll();

                return Ok(vUsers);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserReadDTO>> GetById(int id)
        {
            try
            {
                var vUser = await vGblService.GetById(id);

                return Ok(vUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
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
