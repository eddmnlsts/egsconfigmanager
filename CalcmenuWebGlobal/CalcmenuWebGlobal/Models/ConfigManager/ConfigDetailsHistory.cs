using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Models
{
    public class ConfigDetailsHistory
    {
        public int Numero { get; set; }
        public int SourceNumero { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
    }

    public class ConfigDetailUserHistory
    {
        public int Numero { get; set; }
        public string Description { get; set; }
        public DateTime DateActivity { get; set; }
        public string ActivityType { get; set; }
    }
}
