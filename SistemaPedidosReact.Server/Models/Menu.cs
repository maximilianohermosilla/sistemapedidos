using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Menu
    {
        [Key]
        public int Id { get; set; }
        public int StoreId { get; set; }

        public Store Store { get; set; } = null!;
        public virtual ICollection<ItemMenu>? ItemMenus { get; set; }
    }
}
