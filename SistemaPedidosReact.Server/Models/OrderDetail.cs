using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OrderDetail
    {
        [Key]
        public int Id { get; set; }
        public int OrderId { get; set; }
        public string? DeliveryOperationType { get; set; } = string.Empty; //Turbo || Regular
        public DateTime CreatedAt { get; set; }
        public string? DeliveryMethod { get; set; } = string.Empty; //Mesa || Delivery || Pickup
        public int? MesaId { get; set; }
        public string? CantidadCubiertos { get; set; } = null;
        public int? PaymentMethodId { get; set; } = null;
        public decimal? Tip { get; set; } = 0;
        public int? DeliveryInformationId { get; set; } = null;
        public int? BillingInformationId { get; set; } = null;
        public int? DeliveryDiscountId { get; set; } = null;
        public int? TotalsId { get; set; } = null;

        public Order Order { get; set; } = null!;
        public Mesa? Mesa { get; set; } = null!;
        public PaymentMethod? PaymentMethod { get; set; } = null!;
        public DeliveryInformation? DeliveryInformation { get; set; }
        public BillingInformation? BillingInformation { get; set; }
        public DeliveryDiscount? DeliveryDiscount { get; set; } = null!;
        public Totals? Totals { get; set; } = null!;
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public virtual ICollection<Discount> Discounts { get; set; } = new List<Discount>(); 
    }
}
