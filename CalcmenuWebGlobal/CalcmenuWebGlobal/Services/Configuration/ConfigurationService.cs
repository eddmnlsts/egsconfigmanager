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
    public class ConfigurationService : IConfigurationService
    {
        private readonly DataContext _context;

        public ConfigurationService(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Generic>> GetPickList(int codeTable)
        {
            string strQuery = "EXEC sp_egsToolsGetPicklist @codeTable =" + codeTable;
            var result = await _context.Get_Generic.FromSqlRaw(strQuery).ToListAsync();

                var retVal = new List<Generic>(result.Select(c =>
                               new Generic
                               {
                                   Code = c.Code,
                                   Description = c.Description
                               }).ToList());

                return retVal;
           
        }

        public async Task<int> InsertUpdatePicklist(Generic genericValue, int codetable, int code, int action)
        {

            int retVal = 0;
            try
            {
                string storedProc = "sp_egsToolsUpdatePicklist @codeTable,@intCode,@strDescription,@intAction";

                var paramvalues = new SqlParameter[] {
                    new SqlParameter("codeTable", codetable),
                    new SqlParameter("intCode", genericValue.Code),
                    new SqlParameter("strDescription", genericValue.Description),
                    new SqlParameter("intAction", action)
                };

                retVal = await _context.Database.ExecuteSqlRawAsync(storedProc, paramvalues);
            }
            catch (Exception ex)
            {
                ex.Message.ToString();
                retVal = -2;
            }

            return retVal;
        }

        public async Task<int> DeletePickList(int code, int codetable)
        {

            int retVal = 0;
            string strQuery = "";
            try
            {
                if (codetable == 1)
                {
                    strQuery = "DELETE FROM EgsToolsClients WHERE Code = " + code;
                } else if (codetable == 2)
                {
                    strQuery = "DELETE FROM EgsToolsDepartment WHERE Code = " + code;
                } else
                {
                    strQuery = "DELETE FROM EgsToolsPosition WHERE Code = " + code;
                }

                retVal = await _context.Database.ExecuteSqlRawAsync(strQuery);
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
