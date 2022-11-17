using CalcmenuWebGlobal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Services.Client
{
    public interface IConfigManagerService
    {
        Task<List<ClientList>> GetClientList();
        Task<List<Numeros>> GetNumeroList();
        Task<int> GetMaxNumero();
        Task<List<Numeros>> UpdateNumeroConfig(Numeros[] numeros, int action);
        Task<List<Numeros>> DeleteNumeroConfig(int numero);
        Task<List<Numeros>> GetNumeroConfig(int numero);
        Task<List<Numeros>> GetNumero(string searchText);
        Task<int> InsertUpdateNumeroHistory(ConfigDetailsHistory[] histories, int action);
        Task<List<ClientListChart1>> GetClientCountChart1();
        Task<List<ClientListChart1>> GetUsersPerDepartmentChart2();
        Task<List<ConfigDetailUserHistory>> GetConfigUserHistory(int sourceNum);
    }
}
