using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class DeliveryDiscount
    {
        [Key]
        public int Id { get; set; }

        public decimal TotalPercentageDiscount { get; set; } = decimal.Zero;
        public decimal TotalValueDiscount { get; set; } = decimal.Zero;

        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
