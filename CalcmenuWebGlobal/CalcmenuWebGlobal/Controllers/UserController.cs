using CalcmenuWebGlobal.Models;
using CalcmenuWebGlobal.Services.Client;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly ILoginService _loginService;
        private readonly IUserService _userService;

        public UserController(ILoginService loginService, IUserService userService)
        {
            _loginService = loginService;
            _userService = userService;
        }

        [HttpGet("login/{username}")]
        public async Task<ActionResult<List<Users>>> GetUserDetails(string username)
        {
            return Ok(await _loginService.GetUserDetails(username));
        }

        [HttpGet("user/getuserlist")]
        public async Task<ActionResult<List<Users>>> GetUserList()
        {
            return Ok(await _userService.GetUserList());
        }

        [HttpGet("user/getuserbyusername/{username}")]
        public async Task<ActionResult<List<Users>>> GetUserByUsername(string username)
        {
            return Ok(await _userService.GetUserByUsername(username));
        }

        [HttpPost("createuser")]
        public async Task<ActionResult<bool>> CreateUser([FromBody] Users paramUsers)
        {
            return Ok(await _userService.CreateUser(paramUsers));
        }

        [HttpGet("changepassword/{sourceNum}/{password}")]
        public async Task<ActionResult<int>> ChangePassword(int sourceNum, string password)
        {
            return Ok(await _userService.UpdateUserPassword(sourceNum, password));
        }

        [HttpGet("getconfigcountbyuser/{sourceNum}")]
        public async Task<ActionResult<int>> GetConfigCountByUser(int sourceNum)
        {
            return Ok(await _userService.GetConfigCreatedByUser(sourceNum));
        }
    }
}
