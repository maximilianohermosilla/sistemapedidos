namespace SistemaPedidosReact.Server.DTOs
{
    public class StoreReadDTO
    {
        public int Id { get; set; }
        public string InternalId { get; set; } = string.Empty;
        public string ExternalId { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
    }
}
