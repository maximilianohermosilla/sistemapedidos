namespace SistemaPedidosReact.Server.DTOs
{
    public class MenuCreateDTO
    {
        public int Id { get; set; }
        public int StoreId { get; set; }

        public virtual ICollection<ItemCreateDTO>? Items { get; set; }
    }
}
