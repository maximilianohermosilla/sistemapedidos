using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Totals
    {
        [Key]
        public int Id { get; set; }

        public int TotalProducts { get; set; }
        public decimal TotalDiscounts { get; set; } = decimal.Zero;
        public decimal TotalOrder { get; set; } = decimal.Zero;
        public decimal TotalToPay { get; set; } = decimal.Zero;
        public int? ChargesId { get; set; } = null;
        public int? OtherTotalsId { get; set; } = null;

        public Charges Charges { get; set; } = null!;
        public OtherTotals OtherTotals { get; set; } = null!;
        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
