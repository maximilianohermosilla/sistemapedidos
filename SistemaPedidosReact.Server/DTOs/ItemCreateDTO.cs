namespace SistemaPedidosReact.Server.DTOs
{
    public class ItemCreateDTO
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public string? Observacciones { get; set; } = string.Empty;
        public string Sku { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty; // PRODUCT, TOPPING, etc.
        public decimal Price { get; set; } = 0;
        public string ImageUrl { get; set; } = string.Empty;
        public bool Combo { get; set; } = false;
        public int? MaxLimit { get; set; }
        public int CategoryId { get; set; }
        public int? ParentItemId { get; set; }
        public int? StoreId { get; set; }
        
        public virtual ICollection<ItemCreateDTO> Children { get; set; } = new List<ItemCreateDTO>();
    }
}
