using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Mesa
    {
        [Key]
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public int? Capacity { get; set; } = null;

        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
