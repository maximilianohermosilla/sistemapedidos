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

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryReadDTO>> GetById(int id)
        {
            try
            {
                var vCategory = await vGblService.GetById(id);

                if (vCategory == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Categoría no encontrada" });
                }

                return Ok(vCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<CategoryReadDTO>> Create(CategoryCreateDTO pCategory)
        {
            try
            {
                var vCategory = await vGblService.Create(pCategory);

                return Created("", vCategory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
