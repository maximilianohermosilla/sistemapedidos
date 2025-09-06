using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Customer
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = null;
        public string? PhoneNumber { get; set; } = null;
        public string? DocumentNumber { get; set; } = null;
        public string? UserType { get; set; } = null; // USER_VIP
        public string? Email { get; set; } = null;

        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
