namespace SistemaPedidosReact.Server.DTOs
{
    public class PaymentMethodReadDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public string? Name { get; set; } = null;
    }
}
