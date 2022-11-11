using CalcmenuWebGlobal.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CalcmenuWebGlobal.Data
{
    public class DataContext : DbContext
    {

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<ClientList> Get_ClientItems { get; set; }
        public DbSet<ClientListChart1> Get_ClientItemsChart1 { get; set; }
        public DbSet<Numeros> Get_Numeros { get; set; }
        public DbSet<UserLogin> Get_Users { get; set; }

        public DbSet<Generic> Get_Generic { get; set; }
        public DbSet<Users> Get_UserList { get; set; }
        public DbSet<ItemCount> Get_Count { get; set; }
        public DbSet<ConfigDetailUserHistory> Get_ConfigDetailUserHistory { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ClientList>().HasNoKey();
            modelBuilder.Entity<ClientListChart1>().HasNoKey();
            modelBuilder.Entity<Numeros>().HasNoKey();
            modelBuilder.Entity<Users>().HasNoKey();
            modelBuilder.Entity<UserLogin>().HasNoKey();
            modelBuilder.Entity<Image>().HasNoKey();
            modelBuilder.Entity<ConfigDetailUserHistory>().HasNoKey();
            modelBuilder.Entity<Generic>().HasNoKey();
            modelBuilder.Entity<ItemCount>().HasNoKey();
        }

    }

}
    
