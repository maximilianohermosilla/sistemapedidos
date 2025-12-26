using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderItemReadPOS
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonPropertyName("id")]
        public string IdString { get; set; }
        [JsonIgnore]
        public int ItemId { get; set; }
        [JsonIgnore]
        public int OrderDetailId { get; set; }
        [JsonPropertyName("comments")]
        public string? Comments { get; set; } = null;
        [JsonPropertyName("description")]
        public string? Description { get; set; } = null;
        [JsonPropertyName("price")]
        public decimal Price { get; set; }
        [JsonPropertyName("quantity")]
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
