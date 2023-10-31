
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        // public static async Task ClearConnections(DataContext context)
        // {
        //     context.Connections.RemoveRange(context.Connections);
        //     await context.SaveChangesAsync();
        // }
        // UserManager<AppUser> userManager,
        //     RoleManager<AppRole> roleManager,

        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await File.ReadAllTextAsync("Data/UserSeedData.json");

            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };

            var users = JsonSerializer.Deserialize<List<AppUser>>(userData, options);

            // var roles = new List<AppRole>
            // {
            //     new AppRole{Name = "Member"},
            //     new AppRole{Name = "Admin"},
            //     new AppRole{Name = "Moderator"},
            // };

            // foreach (var role in roles)
            // {
            //     await roleManager.CreateAsync(role);
            // }

            foreach (var user in users)
            {
                // user.UserName = user.UserName.ToLower();
                // user.Created = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                // user.LastActive = DateTime.SpecifyKind(user.Created, DateTimeKind.Utc);
                // await userManager.CreateAsync(user, "Pa$$w0rd");
                // await userManager.AddToRoleAsync(user, "Member");
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$w0rd"));
                user.PasswordSalt = hmac.Key;

                context.Users.Add(user);
            }

            await context.SaveChangesAsync();

            // var admin = new AppUser
            // {
            //     UserName = "admin"
            // };

            // await userManager.CreateAsync(admin, "Pa$$w0rd");
            // await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }
    }
}