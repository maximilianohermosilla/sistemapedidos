using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderDetailReadPOS
    {
        [JsonPropertyName("order_id")]
        public string? OrderId { get; set; } = string.Empty;
        [JsonPropertyName("delivery_operation_type")]
        public string? DeliveryOperationType { get; set; } = "Regular"; //Turbo || Regular
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("delivery_method")]
        public string? DeliveryMethod { get; set; } = "Pickup"; //Mesa || Delivery || Pickup
        [JsonIgnore]
        public int? MesaId { get; set; } = null; 
        [JsonPropertyName("mesa_id")]
        public string? MesaCode { get; set; } = string.Empty;
        [JsonPropertyName("cantidad_cubiertos")]
        public string? CantidadCubiertos { get; set; } = null;
        [JsonIgnore]
        public int PaymentMethodId { get; set; }
        [JsonPropertyName("payment_method")]
        public string? PaymentMethodCode { get; set; } = string.Empty;
        [JsonIgnore]
        public int? DeliveryInformationId { get; set; } = null;
        [JsonIgnore]
        public int? BillingInformationId { get; set; } = null;
        [JsonIgnore]
        public int? DeliveryDiscountId { get; set; } = null;
        [JsonIgnore]
        public int? TotalsId { get; set; } = null;

        [JsonIgnore]
        public MesaReadDTO? Mesa { get; set; } = null!;
        [JsonIgnore]
        public PaymentMethodReadDTO? PaymentMethod { get; set; } = null!;
        [JsonPropertyName("delivery_information")]
        public DeliveryInformationReadPOS? DeliveryInformation { get; set; }
        [JsonPropertyName("billing_information")]
        public BillingInformationReadPOS? BillingInformation { get; set; }
        [JsonPropertyName("delivery_discount")]
        public DeliveryDiscountReadPOS? DeliveryDiscount { get; set; } = null!;
        [JsonPropertyName("totals")]
        public TotalsReadPOS? Totals { get; set; } = null!;
        [JsonPropertyName("items")]
        public virtual ICollection<OrderItemReadPOS> OrderItems { get; set; } = new List<OrderItemReadPOS>();
        [JsonPropertyName("discounts")]
        public virtual ICollection<DiscountReadPOS> Discounts { get; set; } = new List<DiscountReadPOS>(); 
    }
}
