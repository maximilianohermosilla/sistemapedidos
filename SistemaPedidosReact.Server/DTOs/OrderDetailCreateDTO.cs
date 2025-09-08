namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderDetailCreateDTO
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

        public DeliveryInformationCreateDTO? DeliveryInformation { get; set; }
        public BillingInformationCreateDTO? BillingInformation { get; set; }
        public DeliveryDiscountCreateDTO? DeliveryDiscount { get; set; } = null!;
        public TotalsCreateDTO? Totals { get; set; } = null!;
        public virtual ICollection<OrderItemCreateDTO> OrderItems { get; set; } = new List<OrderItemCreateDTO>();
        public virtual ICollection<DiscountCreateDTO> Discounts { get; set; } = new List<DiscountCreateDTO>(); 
    }
}
