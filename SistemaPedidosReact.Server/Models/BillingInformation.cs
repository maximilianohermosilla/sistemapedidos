using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class BillingInformation
    {
        [Key]
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public string? BillingType { get; set; } = null;
        public string? DocumentType { get; set; } = null;
        public string? DocumentNumber { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? Name { get; set; } = null;
        public string? Phone { get; set; } = null;
        public int? OrderDetailId { get; set; }

        public virtual ICollection<OrderDetail>? OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
