using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Models;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class WeeklyScheduleController : ControllerBase
    {
        private readonly IWeeklyScheduleService vGblService;

        public WeeklyScheduleController(IWeeklyScheduleService pService)
        {
            vGblService = pService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<WeeklyScheduleReadDTO>>> GetAll()
        {
            try
            {
                var vWeeklySchedules = await vGblService.GetAll();

                return Ok(vWeeklySchedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{dayWeek}")]
        public async Task<ActionResult<WeeklyScheduleReadDTO>> GetByDayWeek(int dayWeek)
        {
            try
            {
                var vWeeklySchedule = await vGblService.GetByDayWeek(dayWeek);

                if (vWeeklySchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<WeeklyScheduleReadDTO>> IsOpen([FromBody] DateTime date, bool isScheduledOrder)
        {
            try
            {
                var vWeeklySchedule = await vGblService.IsOpen(date, isScheduledOrder);

                return Ok(vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<WeeklyScheduleReadDTO>> GetDaySchedule([FromBody] DateTime date)
        {
            try
            {
                var vWeeklySchedule = await vGblService.GetDaySchedule(date);

                return Ok(vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<WeeklyScheduleReadDTO>> Create(WeeklyScheduleCreateDTO pWeeklySchedule)
        {
            try
            {
                var vWeeklySchedule = await vGblService.Create(pWeeklySchedule);

                return Created("", vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<WeeklyScheduleReadDTO>> Update(WeeklyScheduleCreateDTO pWeeklySchedule)
        {
            try
            {
                var vWeeklySchedule = await vGblService.Update(pWeeklySchedule);

                if (vWeeklySchedule == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vWeeklySchedule);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Authorize]
        public async Task<ActionResult<IEnumerable<WeeklyScheduleReadDTO>>> UpdateAll(IEnumerable<WeeklyScheduleCreateDTO> pWeeklySchedules)
        {
            try
            {
                foreach (var pWeeklySchedule in pWeeklySchedules)
                {
                    var vWeeklySchedule = await vGblService.Update(pWeeklySchedule);

                    if (vWeeklySchedule == null)
                    {
                        return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                    }
                }

                return Ok(pWeeklySchedules);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}