using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
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

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<StoreReadDTO>>> GetAll()
        {
            try
            {
                var vStores = await vGblService.GetAll();

                return Ok(vStores);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StoreReadDTO>> GetById(int id)
        {
            try
            {
                var vStore = await vGblService.GetById(id);

                return Ok(vStore);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
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
