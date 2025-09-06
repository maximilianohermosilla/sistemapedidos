using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OrderItem
    {
        [Key]
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int OrderDetailId { get; set; }
        public string? Comments { get; set; }
        public decimal Price { get; set; }
        public int Quantity { get; set; }
        public int SortingPosition { get; set; } = 0;

        public Item Item { get; set; } = null!;
        public OrderDetail OrderDetail { get; set; } = null!;
        public virtual ICollection<OrderSubItem> OrderSubItems { get; set; } = new List<OrderSubItem>();
    }
}
