namespace SistemaPedidosReact.Server.DTOs
{
    public class MenuReadDTO
    {
        public int Id { get; set; }
        public int StoreId { get; set; }
        public string? Name { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;


        public StoreReadDTO Store { get; set; } = null!;
        public virtual ICollection<ItemReadDTO>? Items { get; set; }
    }
}
