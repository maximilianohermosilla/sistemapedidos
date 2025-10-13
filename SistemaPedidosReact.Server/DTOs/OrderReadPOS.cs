using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderReadPOS
    {
        [JsonIgnore]
        public string State { get; set; } = string.Empty;
        [JsonIgnore]
        public int? Delay { get; set; } = null;
        [JsonIgnore]
        public string? CustomerName { get; set; } = null;
        [JsonIgnore]
        public int? OrderStateId { get; set; } = null;
        [JsonIgnore]
        public int? CustomerId { get; set; } = null;
        [JsonPropertyName("store")]
        public StoreReadPOS Store { get; set; } = null!;
        [JsonIgnore]
        public OrderStateReadDTO OrderState { get; set; } = null!;
        [JsonPropertyName("customer")]
        public CustomerReadPOS Customer { get; set; } = null!;
        [JsonPropertyName("order_detail")]
        public OrderDetailReadPOS? OrderDetail { get; set; } = null!;
    }
}
