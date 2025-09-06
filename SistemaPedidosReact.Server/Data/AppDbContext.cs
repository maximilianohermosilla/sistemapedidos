using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Category> Categories { get; set; }
        public DbSet<Charges> Charges { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemMenu> ItemMenus { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Menu> Mesas { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderSubItem> OrderSubItems { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasMany(i => i.Items).WithOne(i => i.Category).HasForeignKey(i => i.CategoryId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Charges>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.Charges).HasForeignKey(i => i.ChargesId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasMany(i => i.Orders).WithOne(i => i.Customer).HasForeignKey(i => i.CustomerId).OnDelete(DeleteBehavior.Restrict);
            });

            // Relación jerárquica Item -> Children
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasMany(i => i.Children).WithOne(i => i.ParentItem).HasForeignKey(i => i.ParentItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.OrderItems).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.OrderSubItems).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<ItemMenu>(entity =>
            {
                entity.HasOne(i => i.Item).WithMany(i => i.ItemMenus).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Menu).WithMany(i => i.ItemMenus).HasForeignKey(i => i.MenuId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Mesa>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.Mesa).HasForeignKey(i => i.MesaId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.Order).HasForeignKey(i => i.OrderId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasMany(od => od.Items).WithOne(i => i.OrderDetail).HasForeignKey(i => i.OrderDetailId);
                entity.HasMany(od => od.Discounts).WithOne(i => i.OrderDetail).HasForeignKey(i => i.OrderDetailId);
            });

            // Relación OrderItem -> SubItems
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasMany(i => i.OrderSubItems).WithOne(si => si.OrderItem).HasForeignKey(si => si.OrderItemId);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasMany(s => s.Items).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
                entity.HasMany(s => s.Menus).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
                entity.HasMany(s => s.Orders).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
