namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderDetailReadDTO
    {
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

        public MesaReadDTO? Mesa { get; set; } = null!;
        public PaymentMethodReadDTO? PaymentMethod { get; set; } = null!;
        public DeliveryInformationReadDTO? DeliveryInformation { get; set; }
        public BillingInformationReadDTO? BillingInformation { get; set; }
        public DeliveryDiscountReadDTO? DeliveryDiscount { get; set; } = null!;
        public TotalsReadDTO? Totals { get; set; } = null!;
        public virtual ICollection<OrderItemReadDTO> OrderItems { get; set; } = new List<OrderItemReadDTO>();
        public virtual ICollection<DiscountReadDTO> Discounts { get; set; } = new List<DiscountReadDTO>(); 
    }
}
