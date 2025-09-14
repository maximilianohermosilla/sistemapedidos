namespace SistemaPedidosReact.Server.DTOs
{
    public class OrderCancelItemDTO
    {
        public string Sku { get; set; } = string.Empty;
        public int Cantidad { get; set; } = 1;
    }
}
