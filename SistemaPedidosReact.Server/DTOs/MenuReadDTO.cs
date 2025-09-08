namespace SistemaPedidosReact.Server.DTOs
{
    public class MenuReadDTO
    {
        public int Id { get; set; }
        public int StoreId { get; set; }


        public StoreReadDTO Store { get; set; } = null!;
        public virtual ICollection<ItemMenuReadDTO>? ItemMenus { get; set; }
    }
}
