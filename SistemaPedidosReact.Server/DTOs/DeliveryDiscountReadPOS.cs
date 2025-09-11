using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class DeliveryDiscountReadPOS
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonPropertyName("total_percentage_discount")]
        public decimal TotalPercentageDiscount { get; set; } = decimal.Zero;
        [JsonPropertyName("total_value_discount")]
        public decimal TotalValueDiscount { get; set; } = decimal.Zero;
    }
}
