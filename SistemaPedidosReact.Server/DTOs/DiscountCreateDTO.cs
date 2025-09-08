namespace SistemaPedidosReact.Server.DTOs
{
    public class DiscountCreateDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public decimal? Value { get; set; } = decimal.Zero;
        public string Description { get; set; } = string.Empty;
        public int? OrderDetailId { get; set; } = null;
        public int? ItemId { get; set; } = null;
        public string? Sku { get; set; } = string.Empty;
        public string? Type { get; set; } = string.Empty;
        public decimal? RawValue { get; set; } = decimal.Zero;
        public string? TypeValue { get; set; } = string.Empty; // value, percentage
        public decimal? MaxValue { get; set; } = decimal.Zero;
        public bool IncludesToppings { get; set; } = false;
        public decimal? PercentageBySystem { get; set; } = decimal.Zero;
        public decimal? PercentageByPartners { get; set; } = decimal.Zero;
        public decimal? AmmountBySystem { get; set; } = decimal.Zero;
        public decimal? AmmountByPartners { get; set; } = decimal.Zero;
        public int? DiscountProductUnits { get; set; } = null;
        public decimal? DiscountProductUnitValue { get; set; } = decimal.Zero;
    }
}
