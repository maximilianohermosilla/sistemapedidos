namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderItemCreateDTO
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public string? ItemName { get; set; } = string.Empty;
        public int OrderDetailId { get; set; }
        public string? Comments { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int? MaxLimit { get; set; } = null;
        public int SortingPosition { get; set; } = 0;

        public virtual ICollection<OrderSubItemCreateDTO> OrderSubItems { get; set; } = new List<OrderSubItemCreateDTO>();
    }
}
