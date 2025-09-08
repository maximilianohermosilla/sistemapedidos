namespace SistemaPedidosReact.Server.DTOs
{
    public class MesaCreateDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public int? Capacity { get; set; } = null;
    }
}
