using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Store
    {
        [Key]
        public int Id { get; set; }
        public string InternalId { get; set; } = string.Empty;
        public string ExternalId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;

        public virtual ICollection<Item> Items { get; set; } = new List<Item>();
        public virtual ICollection<Menu> Menus { get; set; } = new List<Menu>();
        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}
