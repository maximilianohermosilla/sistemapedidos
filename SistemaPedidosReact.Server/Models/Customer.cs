using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string? LastName { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? Phone { get; set; } = null;

        public virtual ICollection<Order> Orders { get; set; }
    }
}
