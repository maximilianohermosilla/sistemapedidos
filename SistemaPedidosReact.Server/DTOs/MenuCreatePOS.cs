namespace SistemaPedidosReact.Server.DTOs
{
    public class MenuCreatePOS
    {
        public string StoreId { get; set; } = string.Empty;
        public string? Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public virtual ICollection<ItemCreatePOS>? Items { get; set; }
    }
}
