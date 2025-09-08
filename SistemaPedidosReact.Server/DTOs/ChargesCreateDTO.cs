namespace SistemaPedidosReact.Server.DTOs
{
    public class ChargesCreateDTO
    {
        public int Id { get; set; }

        public decimal Shipping { get; set; }
        public decimal ServiceFee { get; set; }
    }
}
