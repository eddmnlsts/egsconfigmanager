using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CalcmenuWebGlobal.Data;
using CalcmenuWebGlobal.Models;
using Microsoft.EntityFrameworkCore;

namespace CalcmenuWebGlobal.Services.Client
{
    public class LoginService : ILoginService
    {
        private readonly DataContext _context;

        public LoginService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<UserLogin>> GetUserDetails(string username)
        {
            string strQuery = @"SELECT SourceNum, FullName, Username, Password, EmailAddress, [Department] = D.Description, 
                                [Position] = P.Description, 
                                IsAdmin, ImagePath 
                                FROM EgsToolsUsers U
                                INNER JOIN EgsToolsDepartment D ON D.Code = U.Department
                                INNER JOIN EgsToolsPosition P ON P.Code = U.Position
                                WHERE Username = '" + username + "'";
            var result = await _context.Get_Users.FromSqlRaw(strQuery).ToListAsync();

                var retVal = new List<UserLogin>(result.Select(c =>
                               new UserLogin
                               {
                                   SourceNum = c.SourceNum,
                                   FullName = c.FullName,
                                   Username = c.Username,
                                   Password = c.Password,
                                   EmailAddress = c.EmailAddress,
                                   Department = c.Department,
                                   Position = c.Position,
                                   IsAdmin = c.IsAdmin,
                                   ImagePath = c.ImagePath
                                   
                               }).ToList());

                return retVal;
           
        }
    }

}
