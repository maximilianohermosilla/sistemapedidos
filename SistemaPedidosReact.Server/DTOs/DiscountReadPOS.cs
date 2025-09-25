using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class DiscountReadPOS
    {
        public string Title { get; set; } = string.Empty;
        public decimal? Value { get; set; } = decimal.Zero;
        public string Description { get; set; } = string.Empty;
        [JsonIgnore]
        public int? OrderDetailId { get; set; } = null;
        [JsonPropertyName("product_id")]
        public int? ItemId { get; set; } = null;
        [JsonPropertyName("sku")]
        public string ItemSku { get; set; } = string.Empty;
        [JsonPropertyName("type")]
        public string ItemType { get; set; } = string.Empty;
        [JsonPropertyName("raw_value")]
        public decimal? RawValue { get; set; } = decimal.Zero;
        [JsonPropertyName("type_value")]
        public string? TypeValue { get; set; } = string.Empty; // value, percentage
        [JsonPropertyName("max_value")]
        public decimal? MaxValue { get; set; } = decimal.Zero;
        [JsonPropertyName("includes_toppings")]
        public bool IncludesToppings { get; set; } = false;
        [JsonPropertyName("percentage_by_system")]
        public decimal? PercentageBySystem { get; set; } = decimal.Zero;
        [JsonPropertyName("percentage_by_partners")]
        public decimal? PercentageByPartners { get; set; } = decimal.Zero;
        [JsonPropertyName("ammount_by_system")]
        public decimal? AmmountBySystem { get; set; } = decimal.Zero;
        [JsonPropertyName("ammount_by_partner")]
        public decimal? AmmountByPartners { get; set; } = decimal.Zero;
        [JsonPropertyName("discount_product_units")]
        public int? DiscountProductUnits { get; set; } = null;
        [JsonPropertyName("discount_product_unit_value")]
        public decimal? DiscountProductUnitValue { get; set; } = decimal.Zero;

        [JsonIgnore]
        public ItemReadDTO? Item { get; set; } = null;
    }
}
