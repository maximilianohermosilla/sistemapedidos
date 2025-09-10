namespace SistemaPedidosReact.Server.DTOs
{
    public class CategoryCreatePOS
    {
        public string Id { get; set; } = string.Empty;
        public string? ExternalId { get; set; } = string.Empty;
        public string? Name { get; set; } = string.Empty;
        public int? MaxQty { get; set; } = 0;
        public int? MinQty { get; set; } = 0;
        public int? SortingPosition { get; set; } = 0;
    }
}
