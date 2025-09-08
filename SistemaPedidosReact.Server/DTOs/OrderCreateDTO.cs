namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderCreateDTO
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string State { get; set; } = string.Empty;
        public int? Delay { get; set; } = null;
        public string? CustomerName { get; set; } = null;
        public int? OrderStateId { get; set; } = null;
        public int? CustomerId { get; set; } = null;

        public virtual ICollection<OrderDetailCreateDTO> OrderDetails { get; set; } = new List<OrderDetailCreateDTO>();
    }
}
