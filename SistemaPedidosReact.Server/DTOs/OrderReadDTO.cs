namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderReadDTO
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string State { get; set; } = string.Empty;
        public int? Delay { get; set; } = null;
        public string? CustomerName { get; set; } = null;
        public int? OrderStateId { get; set; } = null;
        public int? CustomerId { get; set; } = null;

        public StoreReadDTO Store { get; set; } = null!;
        public OrderStateReadDTO OrderState { get; set; } = null!;
        public CustomerReadDTO Customer { get; set; } = null!;
        public virtual ICollection<OrderDetailReadDTO> OrderDetails { get; set; } = new List<OrderDetailReadDTO>();
    }
}
