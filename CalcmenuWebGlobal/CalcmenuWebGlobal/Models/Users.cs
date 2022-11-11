using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Models
{
    public class UserLogin
    {
        public int SourceNum { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public string Department { get; set; }
        public string Position { get; set; }
        public bool IsAdmin { get; set; }
        public string ImagePath { get; set; }

    }

    public class Users
    {
        public int SourceNum { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string EmailAddress { get; set; }
        public int Department { get; set; }
        public int Position { get; set; }

        [NotMapped]
        public Image Image { get; set;  }

    }

    public class Image
    {
        public string Name { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public string Src { get; set; }
    }


    

}
