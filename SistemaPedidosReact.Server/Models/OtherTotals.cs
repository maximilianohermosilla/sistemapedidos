using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class OtherTotals
    {
        [Key]
        public int Id { get; set; }
        public decimal Tip { get; set; }

        public virtual ICollection<Totals> Totals { get; set; } = new List<Totals>();
    }
}
