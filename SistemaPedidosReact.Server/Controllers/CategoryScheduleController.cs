using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryScheduleController : ControllerBase
    {
        private readonly ICategoryScheduleService vGblService;

        public CategoryScheduleController(ICategoryScheduleService pService)
        {
            vGblService = pService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryScheduleReadDTO>>> GetAll()
        {
            try
            {
                var vSchedules = await vGblService.GetAll();
                return Ok(vSchedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryScheduleReadDTO>> GetById(int id)
        {
            try
            {
                var vSchedule = await vGblService.GetById(id);
                if (vSchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Horario no encontrado" });
                }
                return Ok(vSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{categoryId}")]
        public async Task<ActionResult<IEnumerable<CategoryScheduleReadDTO>>> GetAllByCategoryId(int categoryId)
        {
            try
            {
                var vSchedules = await vGblService.GetAllByCategoryId(categoryId);
                return Ok(vSchedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CategoryScheduleReadDTO>> Create(CategoryScheduleCreateDTO pCategorySchedule)
        {
            try
            {
                var vSchedule = await vGblService.Create(pCategorySchedule);
                return Created("", vSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<CategoryScheduleReadDTO>> Update(CategoryScheduleCreateDTO pCategorySchedule)
        {
            try
            {
                var vSchedule = await vGblService.Update(pCategorySchedule);
                if (vSchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Horario no encontrado" });
                }
                return Ok(vSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult<bool>> Delete(int id)
        {
            try
            {
                var vDeleted = await vGblService.Delete(id);
                if (vDeleted == false)
                {
                    return NotFound(new ResponseMessage() { Message = "Ocurrió un error al eliminar el registro." });
                }
                return Ok(vDeleted);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
