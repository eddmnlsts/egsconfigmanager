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
    public class ConfigManagerController : Controller
    {
        private readonly IConfigManagerService _configManagerService;

        public ConfigManagerController(IConfigManagerService configManagerService)
        {
            _configManagerService = configManagerService;
        }
        
        // GET: api/configmanager/clients/
        [HttpGet("getclientlist")]
        public async Task<ActionResult<List<ClientList>>> GetClients()
        {

            return Ok(await _configManagerService.GetClientList());
        }

        [HttpGet("getnumerolist")]
        public async Task<ActionResult<List<Numeros>>> GetNumeroList()
        {
            return Ok(await _configManagerService.GetNumeroList());
        }

        [HttpGet("getmaxnumero")]
        public async Task<ActionResult<int>> GetMaxNUmero()
        {
            return Ok(await _configManagerService.GetMaxNumero());
        }

        [HttpGet("getnumero")]
        public async Task<ActionResult<List<Numeros>>> GetNumero(string searchText)
        {
            return Ok(await _configManagerService.GetNumero(searchText));
        }

        // POST: /api/ConfigManager/add
        [HttpPost("add")]
        public async Task<ActionResult<GetNumero_Result>> AddNumeroConfig(Numeros[] numeros)
        {
            return Ok(await _configManagerService.UpdateNumeroConfig(numeros, 1));
        }

        [HttpPost("update")]
        public async Task<ActionResult<GetNumero_Result>> UpdateNumeroConfig(Numeros[] numeros)
        {
            return Ok(await _configManagerService.UpdateNumeroConfig(numeros, 2));
        }

        [HttpPost("delete")]
        public async Task<ActionResult<GetNumero_Result>> DeleteNumeroConfig(Numeros[] numeros)
        {
            return Ok(await _configManagerService.DeleteNumeroConfig(numeros[0].Numero));
        }

        //GET: api/configmanager/history/123
        [HttpGet("numero/{numero}")]
        public async Task<ActionResult<List<GetNumero_Result>>> GetNumeroConfig(int numero)
        {
            return Ok(await _configManagerService.GetNumeroConfig(numero));
        }

        [HttpPost("historyadd")]
        public async Task<ActionResult<int>> InsertNumeroHistory(ConfigDetailsHistory[] histories)
        {
            return Ok(await _configManagerService.InsertUpdateNumeroHistory(histories, 1));
        }

        [HttpPost("historyupdate")]
        public async Task<ActionResult<int>> UpdateNumeroHistory(ConfigDetailsHistory[] histories)
        {
            return Ok(await _configManagerService.InsertUpdateNumeroHistory(histories, 2));
        }

        // GET: api/configmanager/getclientcountchart1/
        [HttpGet("getclientcountchart1")]
        public async Task<ActionResult<List<ClientListChart1>>> getclientcountchart1()
        {
            return Ok(await _configManagerService.GetClientCountChart1());
        }

        // GET: api/configmanager/getconfigdetailshistoryuser/
        [HttpGet("getconfigdetailshistoryuser/{sourceNum}")]
        public async Task<ActionResult<List<ConfigDetailUserHistory>>> getconfigdetailshistoryuser(int sourceNum)
        {
            return Ok(await _configManagerService.GetConfigUserHistory(sourceNum));
        }

    }
}
