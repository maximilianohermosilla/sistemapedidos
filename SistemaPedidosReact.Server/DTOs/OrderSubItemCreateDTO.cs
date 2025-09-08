namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderSubItemCreateDTO
    {
        public int Id { get; set; }
        public int ItemId { get; set; }       
        public int OrderItemId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int? MaxLimit { get; set; } = null;
        public int SortingPosition { get; set; } = 0;
    }
}
