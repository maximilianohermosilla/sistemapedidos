using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class TotalsReadPOS
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonPropertyName("total_products")]
        public int TotalProducts { get; set; }
        [JsonPropertyName("total_discounts")]
        public decimal TotalDiscounts { get; set; } = decimal.Zero;
        [JsonPropertyName("total_order")]
        public decimal TotalOrder { get; set; } = decimal.Zero;
        [JsonPropertyName("total_to_pay")]
        public decimal TotalToPay { get; set; } = decimal.Zero;
        [JsonIgnore]
        public int? ChargesId { get; set; } = null;
        [JsonIgnore]
        public int? OtherTotalsId { get; set; } = null;

        [JsonPropertyName("charges")]
        public ChargesReadPOS Charges { get; set; } = null!;
        [JsonPropertyName("other_totals")]
        public OtherTotalsReadPOS OtherTotals { get; set; } = null!;
    }
}
