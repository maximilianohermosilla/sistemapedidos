using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemService vGblService;

        public ItemController(IItemService pService)
        {
            vGblService = pService;
        }

        [HttpGet("{query}")]
        public async Task<ActionResult<IEnumerable<ItemReadDTO>>> Search(string query)
        {
            try
            {
                var vItems = await vGblService.Search(query);

                return Ok(vItems);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ItemReadDTO>> GetById(int id)
        {
            try
            {
                var vItem = await vGblService.GetById(id);

                return Ok(vItem);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
