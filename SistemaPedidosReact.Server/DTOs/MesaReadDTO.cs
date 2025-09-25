namespace SistemaPedidosReact.Server.DTOs
{
    public class MesaReadDTO
    {
        public int Id { get; set; }
        public string Code { get; set; } = string.Empty;
        public int? Capacity { get; set; } = null;

        public virtual ICollection<OrderDetailReadDTO> OrderDetails { get; set; } = new List<OrderDetailReadDTO>();
    }
}
