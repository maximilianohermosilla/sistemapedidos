using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class DeliveryInformation
    {
        [Key]
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string? CompleteAdress { get; set; } = null;
        public string? StreetNumber { get; set; } = null;
        public string? Neighborhood { get; set; } = null;
        public string? Complement { get; set; } = null;
        public string? PostalCode { get; set; } = null;
        public string? StreetName { get; set; } = null;

        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }
}
