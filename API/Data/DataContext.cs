
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<AppUser> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Map DateOnly property to DateTime column in the database
            modelBuilder.Entity<AppUser>()
                .Property(e => e.DateOfBirth)
                .HasConversion(
                    v => v.ToDateTime(TimeOnly.MinValue),  // Convert DateOnly to DateTime
                    v => DateOnly.FromDateTime(v)          // Convert DateTime to DateOnly
                );
        }
    }
}