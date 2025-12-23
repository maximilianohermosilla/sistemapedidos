using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class SpecialScheduleController : ControllerBase
    {
        private readonly ISpecialScheduleService vGblService;

        public SpecialScheduleController(ISpecialScheduleService pService)
        {
            vGblService = pService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<SpecialScheduleReadDTO>>> GetAll()
        {
            try
            {
                var vSpecialSchedules = await vGblService.GetAll();

                return Ok(vSpecialSchedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{date}")]
        public async Task<ActionResult<SpecialScheduleReadDTO>> GetByDate(DateTime date)
        {
            try
            {
                var vSpecialSchedule = await vGblService.GetByDate(date);

                if(vSpecialSchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vSpecialSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SpecialScheduleReadDTO>> Create(SpecialScheduleCreateDTO pSpecialSchedule)
        {
            try
            {
                var vSpecialSchedule = await vGblService.Create(pSpecialSchedule);

                return Created("", vSpecialSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<SpecialScheduleReadDTO>> Update(SpecialScheduleCreateDTO pSpecialSchedule)
        {
            try
            {
                var vSpecialSchedule = await vGblService.Update(pSpecialSchedule);

                if (vSpecialSchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vSpecialSchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
