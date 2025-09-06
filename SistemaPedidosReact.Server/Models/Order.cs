using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Order
    {
        [Key]
        public int Id { get; set; }
        public int StoreId { get; set; }
        public int? CustomerId { get; set; } = null;
        public string State { get; set; } = string.Empty;
        public int? Delay { get; set; } = null;
        public string? CustomerName { get; set; } = null;
        public int? OrderStateId { get; set; } = null;


        public Store Store { get; set; } = null!;
        public Customer Customer { get; set; } = null!;
        public OrderState OrderState { get; set; } = null!;
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
