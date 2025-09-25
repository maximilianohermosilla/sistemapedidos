using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string? Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public Store Store { get; set; } = null!;
        public virtual ICollection<Item>? Items { get; set; }
    }
}
