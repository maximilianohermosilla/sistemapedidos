using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService vGblService;

        public CategoryController(ICategoryService pService)
        {
            vGblService = pService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<CategoryReadDTO>>> GetAll()
        {
            try
            {
                var vCategorys = await vGblService.GetAll();

                return Ok(vCategorys);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }    
    }
}
