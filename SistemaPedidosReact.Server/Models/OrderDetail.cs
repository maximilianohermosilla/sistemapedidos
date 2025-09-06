using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string OrderId { get; set; } = string.Empty; // JSON order_id
        [Required]
        public DateTime CreatedAt { get; set; }
        public string? DeliveryMethod { get; set; }
        public int? MesaId { get; set; }
        public string? PaymentMethod { get; set; }
        public string? DeliveryInformation { get; set; } = null;
        public string? BillingInformation { get; set; } = null;
        public string? DeliveryDiscount { get; set; } = null;

        public Order Order { get; set; } = null!;
        public Mesa Mesa { get; set; } = null!;
        public virtual ICollection<OrderItem> Items { get; set; } = new List<OrderItem>();
        public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>();
    }
}
