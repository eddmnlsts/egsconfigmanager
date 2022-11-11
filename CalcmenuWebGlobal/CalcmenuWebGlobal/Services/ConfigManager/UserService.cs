using System;
using System.Collections.Generic;
using Microsoft.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CalcmenuWebGlobal.Data;
using CalcmenuWebGlobal.Models;
using Microsoft.EntityFrameworkCore;
using System.IO;
using CalcmenuWebGlobal.Helpers;

namespace CalcmenuWebGlobal.Services.Client
{
    public class UserService : IUserService
    {
        private readonly DataContext _context;
        private readonly Helpers.Helpers _helpers;

        public UserService(DataContext context, Helpers.Helpers helpers)
        {
            _context = context;
            _helpers = helpers;
        }

        public async Task<int> CreateUser(Users paramUsers)
        {

            int retVal = 0;
            //if (_helpers.UploadUserImage(paramUsers) == true)
            //{
            try
            {
                string storedProc = "sp_egswUpdateEgsToolsUsers @intSourceNum,@strFullName,@strUsername,@strPassword," +
                "@strEmailAddress,@intDepartment,@intPosition,@strImagePath,@intAction";

                var paramvalues = new SqlParameter[] {
                    new SqlParameter("intSourceNum", paramUsers.SourceNum),
                    new SqlParameter("strFullName", paramUsers.FullName),
                    new SqlParameter("strUsername", paramUsers.Username),
                    new SqlParameter("strPassword", paramUsers.Password),
                    new SqlParameter("strEmailAddress", paramUsers.EmailAddress),
                    new SqlParameter("intDepartment", paramUsers.Department),
                    new SqlParameter("intPosition", paramUsers.Position),
                    new SqlParameter("strImagePath", paramUsers.Image.Src),
                    new SqlParameter("intAction", 1)
                };

                retVal = await _context.Database.ExecuteSqlRawAsync(storedProc, paramvalues);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                retVal = -2;
            }
            //}

            return retVal;
        }

        public async Task<List<Users>> GetUserList()
        {
            string strQuery = "SELECT SourceNum, Username, Password, FullName, EmailAddress, Department, Position FROM EgsToolsUsers";
            var result = await _context.Get_UserList.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<Users>(result.Select(c =>
                           new Users
                           {
                               SourceNum = c.SourceNum,
                               Username = c.Username,
                               Password = c.Password,
                               FullName = c.FullName,
                               EmailAddress = c.EmailAddress,
                               Department = c.Department,
                               Position = c.Position
                           }).ToList());

            return retVal;
        }

        public async Task<List<Users>> GetUserByUsername(string username)
        {
            string strQuery = @"SELECT SourceNum, Username, Password, FullName, EmailAddress, Department, Position FROM EgsToolsUsers
                              WHERE Username = '" + username + "'";

            var result = await _context.Get_UserList.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<Users>(result.Select(c =>
                           new Users
                           {
                               SourceNum = c.SourceNum,
                               Username = c.Username,
                               Password = c.Password,
                               FullName = c.FullName,
                               EmailAddress = c.EmailAddress,
                               Department = c.Department,
                               Position = c.Position
                           }).ToList());

            return retVal;
        }

        public async Task<int> UpdateUserPassword(int sourceNum, string password)
        {
            int retVal = 0;
            try
            {
                string strQuery = "UPDATE EgsToolsUsers SET Password = '" + password + "' WHERE SourceNum = " + sourceNum;
                retVal = await _context.Database.ExecuteSqlRawAsync(strQuery);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                retVal = -2;
            }

            return retVal;
        }

        public async Task<int> GetConfigCreatedByUser(int sourceNum)
        {
            int retVal = 0;
            try
            {
                string strQuery = @"SELECT DISTINCT COUNT(H.Numero) COUNT FROM
                                    EgsToolsUsers U
                                    INNER JOIN EgswConfigDetailsHistory H ON H.SourceNum = U.SourceNum
                                    WHERE U.SourceNum =" + sourceNum + "AND H.DateCreated IS NOT NULL";
                var result = await _context.Get_Count.FromSqlRaw(strQuery).ToListAsync();

                retVal = result.Select(c => c.Count).First();

                return retVal;
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                retVal = -2;
            }

            return retVal;

        }
    }

}
