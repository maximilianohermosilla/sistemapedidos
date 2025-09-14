namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderCancelDTO
    {
        public string StoreId { get; set; } = string.Empty;
        public IEnumerable<OrderCancelItemDTO> Items { get; set; } = new List<OrderCancelItemDTO>();
    }
}
