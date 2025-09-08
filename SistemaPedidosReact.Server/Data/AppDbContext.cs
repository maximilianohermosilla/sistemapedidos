using Microsoft.EntityFrameworkCore;
using SistemaPedidosReact.Server.Models;

namespace SistemaPedidosReact.Server.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<BillingInformation> BillingInformations { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Charges> Charges { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<DeliveryDiscount> DeliveryDiscounts { get; set; }
        public DbSet<DeliveryInformation> DeliveryInformations { get; set; }
        public DbSet<Discount> Discounts { get; set; }
        public DbSet<Item> Items { get; set; }
        public DbSet<ItemMenu> ItemMenus { get; set; }
        public DbSet<Menu> Menus { get; set; }
        public DbSet<Mesa> Mesas { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<OrderState> OrderStates { get; set; }
        public DbSet<OrderSubItem> OrderSubItems { get; set; }
        public DbSet<OtherTotals> OtherTotals { get; set; }
        public DbSet<Parameter> Parameters { get; set; }
        public DbSet<PaymentMethod> PaymentMethods { get; set; }
        public DbSet<Store> Stores { get; set; }
        public DbSet<Totals> Totals { get; set; }
        public DbSet<User> Users { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BillingInformation>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.BillingInformation).HasForeignKey(i => i.BillingInformationId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasMany(i => i.Items).WithOne(i => i.Category).HasForeignKey(i => i.CategoryId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Charges>(entity =>
            {
                entity.HasMany(i => i.Totals).WithOne(i => i.Charges).HasForeignKey(i => i.ChargesId).OnDelete(DeleteBehavior.NoAction);
                entity.Property(t => t.Shipping).HasPrecision(10, 2);
                entity.Property(t => t.ServiceFee).HasPrecision(10, 2);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.HasMany(i => i.Orders).WithOne(i => i.Customer).HasForeignKey(i => i.CustomerId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<DeliveryDiscount>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.DeliveryDiscount).HasForeignKey(i => i.DeliveryDiscountId).OnDelete(DeleteBehavior.Restrict);
                entity.Property(t => t.TotalPercentageDiscount).HasPrecision(10, 2);
                entity.Property(t => t.TotalValueDiscount).HasPrecision(10, 2);
            });

            modelBuilder.Entity<DeliveryInformation>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.DeliveryInformation).HasForeignKey(i => i.DeliveryInformationId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Discount>(entity =>
            {
                entity.HasOne(i => i.OrderDetail).WithMany(i => i.Discounts).HasForeignKey(i => i.OrderDetailId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Item).WithMany(i => i.Discounts).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.NoAction);
                entity.Property(t => t.Value).HasPrecision(10, 2);
                entity.Property(t => t.RawValue).HasPrecision(10, 2);
                entity.Property(t => t.MaxValue).HasPrecision(10, 2);
                entity.Property(t => t.PercentageBySystem).HasPrecision(10, 2);
                entity.Property(t => t.PercentageByPartners).HasPrecision(10, 2);
                entity.Property(t => t.AmmountBySystem).HasPrecision(10, 2);
                entity.Property(t => t.AmmountByPartners).HasPrecision(10, 2);
                entity.Property(t => t.DiscountProductUnitValue).HasPrecision(10, 2);
            });

            // Relación jerárquica Item -> Children
            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasOne(i => i.Category).WithMany(i => i.Items).HasForeignKey(i => i.CategoryId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Store).WithMany(i => i.Items).HasForeignKey(i => i.StoreId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(i => i.Children).WithOne(i => i.ParentItem).HasForeignKey(i => i.ParentItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.ItemMenus).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.OrderItems).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.OrderSubItems).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(i => i.Discounts).WithOne(i => i.Item).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.Restrict);
                entity.Property(t => t.Price).HasPrecision(10, 2);
            });

            modelBuilder.Entity<ItemMenu>(entity =>
            {
                entity.HasOne(i => i.Item).WithMany(i => i.ItemMenus).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Menu).WithMany(i => i.ItemMenus).HasForeignKey(i => i.MenuId).OnDelete(DeleteBehavior.NoAction);
            });

            modelBuilder.Entity<Menu>(entity =>
            {
                entity.HasOne(i => i.Store).WithMany(i => i.Menus).HasForeignKey(i => i.StoreId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(i => i.ItemMenus).WithOne(i => i.Menu).HasForeignKey(i => i.MenuId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Mesa>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.Mesa).HasForeignKey(i => i.MesaId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.HasOne(i => i.Store).WithMany(i => i.Orders).HasForeignKey(i => i.StoreId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.OrderState).WithMany(i => i.Orders).HasForeignKey(i => i.OrderStateId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Customer).WithMany(i => i.Orders).HasForeignKey(i => i.CustomerId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(i => i.OrderDetails).WithOne(i => i.Order).HasForeignKey(i => i.OrderId).OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<OrderDetail>(entity =>
            {
                entity.HasOne(i => i.Order).WithMany(i => i.OrderDetails).HasForeignKey(i => i.OrderId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Mesa).WithMany(i => i.OrderDetails).HasForeignKey(i => i.MesaId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.PaymentMethod).WithMany(i => i.OrderDetails).HasForeignKey(i => i.PaymentMethodId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.DeliveryInformation).WithMany(i => i.OrderDetails).HasForeignKey(i => i.DeliveryInformationId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.BillingInformation).WithMany(i => i.OrderDetails).HasForeignKey(i => i.BillingInformationId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.DeliveryDiscount).WithMany(i => i.OrderDetails).HasForeignKey(i => i.DeliveryDiscountId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.Totals).WithMany(i => i.OrderDetails).HasForeignKey(i => i.TotalsId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(od => od.OrderItems).WithOne(i => i.OrderDetail).HasForeignKey(i => i.OrderDetailId);
                entity.HasMany(od => od.Discounts).WithOne(i => i.OrderDetail).HasForeignKey(i => i.OrderDetailId);
                entity.Property(t => t.Tip).HasPrecision(10, 2);
            });

            // Relación OrderItem -> SubItems
            modelBuilder.Entity<OrderItem>(entity =>
            {
                entity.HasOne(i => i.Item).WithMany(i => i.OrderItems).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.OrderDetail).WithMany(i => i.OrderItems).HasForeignKey(i => i.OrderDetailId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(i => i.OrderSubItems).WithOne(si => si.OrderItem).HasForeignKey(si => si.OrderItemId);
                entity.Property(t => t.Price).HasPrecision(10, 2);
            });

            modelBuilder.Entity<OrderState>(entity =>
            {
                entity.HasMany(i => i.Orders).WithOne(si => si.OrderState).HasForeignKey(si => si.OrderStateId);
            });

            modelBuilder.Entity<OrderSubItem>(entity =>
            {
                entity.HasOne(i => i.Item).WithMany(i => i.OrderSubItems).HasForeignKey(i => i.ItemId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.OrderItem).WithMany(i => i.OrderSubItems).HasForeignKey(i => i.OrderItemId).OnDelete(DeleteBehavior.NoAction);
                entity.Property(t => t.Price).HasPrecision(10, 2);
            });

            modelBuilder.Entity<OtherTotals>(entity =>
            {
                entity.HasMany(i => i.Totals).WithOne(si => si.OtherTotals).HasForeignKey(si => si.OtherTotalsId);
                entity.Property(t => t.Tip).HasPrecision(10, 2);
            });

            modelBuilder.Entity<Parameter>(entity =>
            {

            });

            modelBuilder.Entity<PaymentMethod>(entity =>
            {
                entity.HasMany(i => i.OrderDetails).WithOne(si => si.PaymentMethod).HasForeignKey(si => si.PaymentMethodId);
            });

            modelBuilder.Entity<Store>(entity =>
            {
                entity.HasMany(s => s.Items).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
                entity.HasMany(s => s.Menus).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
                entity.HasMany(s => s.Orders).WithOne(i => i.Store).HasForeignKey(i => i.StoreId);
            });

            modelBuilder.Entity<Totals>(entity =>
            {
                entity.HasOne(i => i.Charges).WithMany(i => i.Totals).HasForeignKey(i => i.ChargesId).OnDelete(DeleteBehavior.NoAction);
                entity.HasOne(i => i.OtherTotals).WithMany(i => i.Totals).HasForeignKey(i => i.OtherTotalsId).OnDelete(DeleteBehavior.NoAction);
                entity.HasMany(s => s.OrderDetails).WithOne(i => i.Totals).HasForeignKey(i => i.TotalsId);
                entity.Property(t => t.TotalDiscounts).HasPrecision(10, 2);
                entity.Property(t => t.TotalOrder).HasPrecision(10, 2);
                entity.Property(t => t.TotalToPay).HasPrecision(10, 2);
            });

            modelBuilder.Entity<User>(entity =>
            {

            });


            #region HasData
            modelBuilder.Entity<OrderState>().HasData(
                new OrderState { Id = 1, Name = "RECIBIDO" },
                new OrderState { Id = 2, Name = "ACEPTADO" },
                new OrderState { Id = 3, Name = "RECHAZADO" },
                new OrderState { Id = 4, Name = "LISTO" },
                new OrderState { Id = 5, Name = "ENVIADO" }
            );

            modelBuilder.Entity<PaymentMethod>().HasData(
               new PaymentMethod { Id = 1, Code = "EF", Name = "Efectivo" },
               new PaymentMethod { Id = 2, Code = "TC", Name = "Tarjeta Crédito" },
               new PaymentMethod { Id = 3, Code = "TD", Name = "Tarjeta Débito" },
               new PaymentMethod { Id = 4, Code = "ON", Name = "Pago Online" },
               new PaymentMethod { Id = 5, Code = "MP", Name = "MercadoPago" },
               new PaymentMethod { Id = 6, Code = "MO", Name = "Modo" },
               new PaymentMethod { Id = 7, Code = "PN", Name = "Pago Nube" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "Administrador", LastName = "Sistemas", Email = "maximiliano_hermosilla@hotmail.com", 
                    UserName = "admin", Password = "CLAve123**", CreatedAt = DateTime.Now, Enabled = true }            
            );

            modelBuilder.Entity<Store>().HasData(
                new Store { Id = 1, Name = "El Refugio", InternalId = "1", ExternalId = "1" }
            );

            #endregion

            base.OnModelCreating(modelBuilder);
        }
    }
}
