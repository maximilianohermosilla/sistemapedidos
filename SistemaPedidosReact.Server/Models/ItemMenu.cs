using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class ItemMenu
    {
        [Key]
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int MenuId { get; set; }

        public Item? Item { get; set; }
        public Menu? Menu { get; set; }
    }
}
