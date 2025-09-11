using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderSubItemReadPOS
    {
        [JsonPropertyName("id")]
        public int ItemId { get; set; }
        [JsonIgnore]
        public int OrderItemId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        [JsonIgnore]
        public int SortingPosition { get; set; } = 0;

        [JsonPropertyName("sku")]
        public string ItemSku { get; set; } = string.Empty;
        [JsonPropertyName("name")]
        public string ItemName { get; set; } = string.Empty;
        [JsonPropertyName("type")]
        public string ItemType { get; set; } = string.Empty;

        [JsonIgnore]
        public ItemReadDTO Item { get; set; } = null!;
    }
}
