using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using Banico.Core.Entities;
using Banico.EntityFrameworkCore.Settings;

namespace Banico.EntityFrameworkCore
{
    public class AppDbContext : DbContext
    {
        private ConfigDefaultSettings _configDefaultSettings;
        private readonly bool _isMigration = false;
        public string _connectionString = String.Empty;

        public AppDbContext(ConfigDefaultSettings configDefaultSettings)
        {
            _isMigration = true;
            _configDefaultSettings = configDefaultSettings;
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (_isMigration)
            {
                var connectionStringBuilder = new Microsoft.Data.Sqlite.SqliteConnectionStringBuilder { DataSource = "banico.db" };
                var connectionString = connectionStringBuilder.ToString();

                optionsBuilder.UseSqlite(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            // builder.Entity<AppUser>(i => {
            //     i.HasKey(x => x.Id);
            // });

            // builder.Entity<IdentityUserRole<int>>()
            //     .HasKey(p => new { p.UserId, p.RoleId});
                
            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Claims)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Logins)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            // builder.Entity<AppUser>()
            //     .HasMany(e => e.Roles)
            //     .WithOne()
            //     .HasForeignKey(e => e.UserId)
            //     .IsRequired()
            //     .OnDelete(DeleteBehavior.Cascade);

            if (_isMigration)
            {
                string[] configs = _configDefaultSettings.Configs;
                this.InsertConfigs(builder, configs);
            }
        }

        public void InsertConfigs(ModelBuilder builder, string[] configs)
        {
            foreach (string config in configs)
            {
                string[] configElements = config.Split(","[0]);
                this.InsertConfig(builder, configElements[0], configElements[1], configElements[2]);
            }
        }

        public void InsertConfig(ModelBuilder builder, string module, string name, string value)
        {
            Config config = new Config();
            config.Id = Guid.NewGuid().ToString();
            config.CreatedDate = DateTimeOffset.UtcNow;
            config.Module = module;
            config.Name = name;
            config.Value = value;

            builder.Entity<Config>().HasData(config);
        }

        //List of DB Models - Add your DB models here
        public DbSet<User> User { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<SectionItem> SectionItems { get; set; }
        public DbSet<ContentSectionItem> ContentSectionItems { get; set; }
        public DbSet<ContentItem> ContentItems { get; set; }
        public DbSet<Config> Configs { get; set; }
        public DbSet<Invite> Invites { get; set; }
    }
}
