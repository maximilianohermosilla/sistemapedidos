using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string? DeliveryMethod { get; set; }
        public int? MesaId { get; set; }
        public int? ChargesId { get; set; } = null;
        public string? PaymentMethod { get; set; } = null;
        public decimal? Tip { get; set; } = 0;
        public string? DeliveryInformation { get; set; } = null;
        public string? BillingInformation { get; set; } = null;
        public string? DeliveryDiscount { get; set; } = null;

        public Order Order { get; set; } = null!;
        public Mesa Mesa { get; set; } = null!;
        public Charges Charges { get; set; } = null!;
        public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();
    }
}
