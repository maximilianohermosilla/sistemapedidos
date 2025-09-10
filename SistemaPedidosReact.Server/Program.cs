using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Data;
using SistemaPedidosReact.Server.Data.Interfaces;
using SistemaPedidosReact.Server.Data.Repositories;
using SistemaPedidosReact.Server.Profiles;
using SistemaPedidosReact.Server.Responses.Interfaces;
using SistemaPedidosReact.Server.Responses.Services;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Configurar AutoMapper
builder.Services.AddAutoMapper(config => new MappingProfile(config));

// Configurar servicios de infraestructura
builder.Services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IMenuRepository, MenuRepository>();
builder.Services.AddScoped<IItemRepository, ItemRepository>();
builder.Services.AddScoped<IStoreRepository, StoreRepository>();

// Configurar servicios de la aplicaci�n 
builder.Services.AddScoped<IPaymentMethodService, PaymentMethodService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IMenuService, MenuService>();
builder.Services.AddScoped<IItemService, ItemService>();
builder.Services.AddScoped<IStoreService, StoreService>();

//ADD CORS
builder.Services.AddCors(options => options.AddPolicy("AllowWebApp",
    builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));



var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//APP USE CORS
app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials()
);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

// Aplicar migraciones autom�ticamente
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    try
    {
        context.Database.Migrate();
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error aplicando migraciones: {ex.Message}");
    }
}

app.MapFallbackToFile("/index.html");

app.Run();
