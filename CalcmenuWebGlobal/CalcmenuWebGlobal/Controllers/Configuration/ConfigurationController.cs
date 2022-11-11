using CalcmenuWebGlobal.Models;
using CalcmenuWebGlobal.Services.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
        private readonly IConfigurationService _configurationService;

        public ConfigurationController(IConfigurationService configurationService)
        {
            _configurationService = configurationService;
        }
        
        // GET: api/configuration/getpicklist/
        [HttpGet("getpicklist/{codeTable}")]
        public async Task<ActionResult<List<Generic>>> GetPickList(int codeTable)
        {
            return Ok(await _configurationService.GetPickList(codeTable));
        }

        [HttpPost("updatepicklist")]
        public async Task<ActionResult<int>> CreateEditPicklist([FromBody] Generic paramGeneric, int codeTable, int action)
        {
            return Ok(await _configurationService.InsertUpdatePicklist(paramGeneric, codeTable, 0, action));
        }

        [HttpGet("deletepicklist/{code}/{codetable}")]
        public async Task<ActionResult<int>> DeletePicklist(int code, int codeTable)
        {
            return Ok(await _configurationService.DeletePickList(code, codeTable));
        }


    }
}
