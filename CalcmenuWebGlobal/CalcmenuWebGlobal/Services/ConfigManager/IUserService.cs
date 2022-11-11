using CalcmenuWebGlobal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Services.Client
{
    public interface IUserService
    {
        Task<int> CreateUser(Users paramUsers);
        Task<List<Users>> GetUserList();
        Task<int> UpdateUserPassword(int sourceNum, string password);

        Task<int> GetConfigCreatedByUser(int sourceNum);
    }
}
