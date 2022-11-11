using CalcmenuWebGlobal.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Services.Client
{
    public interface IConfigurationService
    {
        Task<List<Generic>> GetPickList(int codeTable);
        Task<int> InsertUpdatePicklist(Generic genericValue, int codetable, int code, int action);
        Task<int> DeletePickList(int code, int codetable);
    }
}
