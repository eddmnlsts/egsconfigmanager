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
    public class ConfigManagerService : IConfigManagerService
    {
        private readonly DataContext _context;

        public ConfigManagerService(DataContext context)
        {
            _context = context;
        }

        //GET LIST OF CLIENTS
        public async Task<List<ClientList>> GetClientList()
        {
            string strQuery = "SELECT DISTINCT 0 as 'Value', Client 'Label' FROM EgswConfigDetails WHERE Client IS NOT NULL ORDER BY Client";


            var result = await _context.Get_ClientItems.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<ClientList>();

            for (int i = 0; i <= result.Count - 1; i++)
            {
                var cList = new ClientList();
                cList.Value = i + 1;
                cList.Label = result[i].Label;
                retVal.Add(cList);
            }

            return retVal;

        }

        //GET MAX NUMERO
        public async Task<int> GetMaxNumero()
        {
            var result = await GetNumeroList();

            var maxZ = result.Max(obj => obj.Numero);

            return maxZ + 1;

        }

        //SEARCH ALL
        public async Task<List<Numeros>> GetNumeroList()
        {
            string strQuery = @"SELECT Numero, D.Description, Client = C.Description , Remarks FROM EgswConfigDetails D
                              INNER JOIN EgsToolsClients C ON C.Code = D.Client";

            var result = await _context.Get_Numeros.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<Numeros>(result.Select(c =>
                                new Numeros
                                {
                                    Numero = c.Numero,
                                    Description = c.Description,
                                    Client = c.Client,
                                    Remarks = c.Remarks
                                }).OrderByDescending(o => o.Numero));
            return retVal;
        }

        //INSERT UPDATE
        public async Task<List<Numeros>> UpdateNumeroConfig(Numeros[] numeros, int action)
        {

            string storedProc = "sp_egswUpdateEgswConfigDetails @intNumero,@strDescription,@strClient,@strRemarks,@intAction";

            foreach (Numeros numero in numeros)
            {
                var paramvalues = new SqlParameter[] {
                    new SqlParameter("intNumero", numero.Numero),
                    new SqlParameter("strDescription", numero.Description),
                    new SqlParameter("strClient", numero.Client),
                    new SqlParameter("strRemarks", numero.Remarks),
                    new SqlParameter("intAction", action),
                };

                await _context.Database.ExecuteSqlRawAsync(storedProc, paramvalues);
            }

            string storedProc2 = "SELECT Numero, Description, Client, Remarks FROM EgswConfigDetails";
            var result2  = await _context.Get_Numeros.FromSqlRaw(storedProc2).ToListAsync();

            var retVal = new List<Numeros>(result2.Select(c =>
                                new Numeros
                                {
                                    Numero = c.Numero,
                                    Description = c.Description,
                                    Client = c.Client,
                                    Remarks = c.Remarks
                                }).OrderByDescending(o => o.Numero));
            return retVal;

        }

        public async Task<int> InsertUpdateNumeroHistory(ConfigDetailsHistory[] histories, int action)
        {
            string storedProc = "";
            int retVal = 0;

            foreach (ConfigDetailsHistory history in histories)
            {
                if (action == 1)
                {
                    storedProc = "INSERT INTO EgswConfigDetailsHistory (Numero, SourceNum, DateCreated) VALUES (" + history.Numero + "," + history.SourceNumero + ", GETDATE())";
                }
                else
                {
                    storedProc = "INSERT INTO EgswConfigDetailsHistory (Numero, SourceNum, DateModified) VALUES (" + history.Numero + "," + history.SourceNumero + ", GETDATE())";
                }

                retVal = await _context.Database.ExecuteSqlRawAsync(storedProc);
            }

            return retVal;

        }

        //DELETE
        public async Task<List<Numeros>> DeleteNumeroConfig(int numero)
        {
          
                string strQuery = "DELETE FROM EgswConfigDetails WHERE Numero =" + numero;
                await _context.Database.ExecuteSqlRawAsync(strQuery);

                //------------------------------------------------------------------------------------------

                string storedProc2 = "SELECT Numero, Description, Client, Remarks FROM EgswConfigDetails";
                var result2 = await _context.Get_Numeros.FromSqlRaw(storedProc2).ToListAsync();

                var retVal = new List<Numeros>(result2.Select(c =>
                                    new Numeros
                                    {
                                        Numero = c.Numero,
                                        Description = c.Description,
                                        Client = c.Client,
                                        Remarks = c.Remarks
                                    }).OrderByDescending(o => o.Numero));
                return retVal;

        }

        //EDIT SEARCH
        public async Task<List<Numeros>> GetNumeroConfig(int numero)
        {
            string strQuery = @"SELECT Numero, Description, Client, Remarks FROM EgswConfigDetails WHERE Numero = " + numero;
            var result2 = await _context.Get_Numeros.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<Numeros>(result2.Select(c =>
                                new Numeros
                                {
                                    Numero = c.Numero,
                                    Description = c.Description,
                                    Client = c.Client,
                                    Remarks = c.Remarks
                                }).ToList());
            return retVal;
        }

        //SEARCH
        public async Task<List<Numeros>> GetNumero(string searchText)
        {
            string strQuery = @"SELECT Numero, D.Description, Client = C.Description , Remarks FROM EgswConfigDetails D
                                INNER JOIN EgsToolsClients C ON C.Code = D.Client
                                WHERE D.Description LIKE '%" + searchText + "%'";
            var result = await _context.Get_Numeros.FromSqlRaw(strQuery).ToListAsync();

            if (result.Count > 0)
            {
                var retVal = new List<Numeros>(result.Select(c =>
                               new Numeros
                               {
                                   Numero = c.Numero,
                                   Description = c.Description,
                                   Client = c.Client,
                                   Remarks = c.Remarks
                               }).ToList());

                return retVal;
            } else
            {
                string strQuery2 = "SELECT Numero, Description, Client, Remarks FROM EgswConfigDetails WHERE Numero LIKE '%" + searchText + "%'";
                var result2 = await _context.Get_Numeros.FromSqlRaw(strQuery2).ToListAsync();

                var retVal = new List<Numeros>(result2.Select(c =>
                               new Numeros
                               {
                                   Numero = c.Numero,
                                   Description = c.Description,
                                   Client = c.Client,
                                   Remarks = c.Remarks
                               }).ToList());

                return retVal;
            }
           
            
        }

        public async Task<List<ClientListChart1>> GetClientCountChart1()
        {
            string strQuery = @"SELECT COUNT(C.Description) 'Y', C.Description 'Name' FROM EgswCOnfigDetails D
                               INNER JOIN EgsToolsClients C ON C.Code = D.Client GROUP BY C.Description
                               ORDER BY Y DESC";


            var result = await _context.Get_ClientItemsChart1.FromSqlRaw(strQuery).ToListAsync();

            var retVal = new List<ClientListChart1>();

            for (int i = 0; i <= result.Count - 1; i++)
            {
                var cList = new ClientListChart1();
                cList.Y = result[i].Y;
                cList.Name = result[i].Name;
                retVal.Add(cList);
            }

            
            return retVal;

        }

        public async Task<List<ConfigDetailUserHistory>> GetConfigUserHistory(int sourceNum)
        {
            string storedProc = "EXEC sp_egswGetUserActivity @intSourceNum = " + sourceNum;
            var result = await _context.Get_ConfigDetailUserHistory.FromSqlRaw(storedProc).ToListAsync();

            var retVal = new List<ConfigDetailUserHistory>(result.Select(c =>
                                new ConfigDetailUserHistory
                                {
                                    Numero = c.Numero,
                                    Description = c.Description,
                                    DateActivity = c.DateActivity,
                                    ActivityType= c.ActivityType
                                }).OrderByDescending(o => o.DateActivity));

            

            return retVal;
        }

    }

}
