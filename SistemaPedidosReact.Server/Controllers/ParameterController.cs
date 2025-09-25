using Microsoft.AspNetCore.Mvc;
using SistemaPedidosReact.Server.DTOs;
using SistemaPedidosReact.Server.Responses.Interfaces;

namespace SistemaPedidosReact.Server.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ParameterController : ControllerBase
    {
        private readonly IParameterService vGblService;

        public ParameterController(IParameterService pService)
        {
            vGblService = pService;
        }

        [HttpGet()]
        public async Task<ActionResult<IEnumerable<ParameterReadDTO>>> GetAll()
        {
            try
            {
                var vParameters = await vGblService.GetAll();

                return Ok(vParameters);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ParameterReadDTO>> GetById(int id)
        {
            try
            {
                var vParameter = await vGblService.GetById(id);

                if (vParameter == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vParameter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{key}")]
        public async Task<ActionResult<ParameterReadDTO>> GetByKey(string key)
        {
            try
            {
                var vParameter = await vGblService.GetByKey(key);

                if(vParameter == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vParameter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<ActionResult<ParameterReadDTO>> Create(ParameterCreateDTO pParameter)
        {
            try
            {
                var vParameter = await vGblService.Create(pParameter);

                return Created("", vParameter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        public async Task<ActionResult<ParameterReadDTO>> Update(ParameterCreateDTO pParameter)
        {
            try
            {
                var vParameter = await vGblService.Update(pParameter);

                if (vParameter == null)
                {
                    return NotFound(new ResponseMessage() { Message = "Parámetro no encontrado" });
                }

                return Ok(vParameter);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
