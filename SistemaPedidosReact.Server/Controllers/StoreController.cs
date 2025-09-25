using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService vGblService;

        public StoreController(IStoreService pService)
        {
            vGblService = pService;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StoreReadDTO>> GetById(int id)
        {
            try
            {
                var vStore = await vGblService.GetById(id);

                if (vStore == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Tienda no encontrada" });
                }

                return Ok(vStore);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<StoreReadDTO>> Create(StoreCreateDTO pStore)
        {
            try
            {
                var vStore = await vGblService.Create(pStore);

                return Created("", vStore);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
