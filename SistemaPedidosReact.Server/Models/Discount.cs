using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Discount
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public int? Quantity { get; set; } = null;
        public int? OrderDetailId { get; set; } = null;

        public OrderDetail? OrderDetail { get; set; }
    }
}
