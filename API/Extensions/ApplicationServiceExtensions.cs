
using API.Data;
using API.Interfaces;
using API.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            services.AddCors();

            // Register services using DI
            services.AddScoped<ITokenService, TokenService>();
            services.AddScoped<IUserRepository, UserRepository>();

            // Register auto mapper
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            return services;

        }
    }
}