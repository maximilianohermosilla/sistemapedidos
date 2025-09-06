using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OrderSubItem
    {
        [Key]
        public int Id { get; set; }
        public int ItemId { get; set; }       
        public int OrderItemId { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }

        public Item Item { get; set; } = null!;
        public OrderItem OrderItem { get; set; } = null!;
    }
}
