using CalcmenuWebGlobal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Services.Client
{
    public interface ILoginService
    {
        Task<List<UserLogin>> GetUserDetails(string username);
    }
}
