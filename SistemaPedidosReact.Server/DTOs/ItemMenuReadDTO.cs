namespace SistemaPedidosReact.Server.DTOs
{
    public class ItemMenuReadDTO
    {
        public int Id { get; set; }
        public int ItemId { get; set; }
        public int MenuId { get; set; }

        public ItemReadDTO? Item { get; set; }
    }
}
