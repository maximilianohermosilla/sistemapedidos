using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderItemReadPOS
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonPropertyName("id")]
        public int ItemId { get; set; }
        [JsonIgnore]
        public int OrderDetailId { get; set; }
        public string? Comments { get; set; }
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
        [JsonPropertyName("subitems")]
        public virtual ICollection<OrderSubItemReadPOS> OrderSubItems { get; set; } = new List<OrderSubItemReadPOS>();
    }
}
