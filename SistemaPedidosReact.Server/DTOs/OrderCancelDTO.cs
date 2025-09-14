namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderCancelDTO
    {
        public string storeId { get; set; } = string.Empty;
        public IEnumerable<OrderCancelItemDTO> items { get; set; } = new List<OrderCancelItemDTO>();
    }
}
