using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public string? ExternalId { get; set; } = string.Empty; // JSON "id"     
        public string Name { get; set; } = string.Empty;
        public int MaxQty { get; set; } = 0;
        public int MinQty { get; set; } = 0;
        public int SortingPosition { get; set; } = 0;

        public ICollection<Item> Items { get; set; } = new List<Item>();
    }
}
