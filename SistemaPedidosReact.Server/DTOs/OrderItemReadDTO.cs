namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderItemReadDTO
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int OrderDetailId { get; set; }
        public string? Comments { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int? MaxLimit { get; set; } = null;
        public int SortingPosition { get; set; } = 0;

        public ItemReadDTO Item { get; set; } = null!;
        public virtual ICollection<OrderSubItemReadDTO> OrderSubItems { get; set; } = new List<OrderSubItemReadDTO>();
    }
}
