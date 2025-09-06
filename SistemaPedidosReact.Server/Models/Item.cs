using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; } = string.Empty;
        public decimal Price { get; set; } = 0;
        [Required]
        public string Sku { get; set; } = string.Empty;
        [Required]
        public string Type { get; set; } = string.Empty; // PRODUCT, TOPPING, etc.
        public bool Combo { get; set; } = false;
        public int? MaxLimit { get; set; }
        public int CategoryId { get; set; }
        public int? ParentItemId { get; set; }
        public int? StoreId { get; set; }
        
        public Category Category { get; set; } = null!;
        public Item? ParentItem { get; set; }
        public Store? Store { get; set; } = null!;
        public virtual ICollection<Item> Children { get; set; } = new List<Item>();
        public virtual ICollection<ItemMenu>? ItemMenus { get; set; } = new List<ItemMenu>();
        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
        public virtual ICollection<OrderSubItem> OrderSubItems { get; set; } = new List<OrderSubItem>();
    }
}
