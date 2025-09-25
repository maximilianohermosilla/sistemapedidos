namespace SistemaPedidosReact.Server.DTOs
{
    public class TotalsCreateDTO
    {
        public int Id { get; set; }
        public int TotalProducts { get; set; }
        public decimal TotalDiscounts { get; set; } = decimal.Zero;
        public decimal TotalOrder { get; set; } = decimal.Zero;
        public decimal TotalToPay { get; set; } = decimal.Zero;
        public int? ChargesId { get; set; } = null;
        public int? OtherTotalsId { get; set; } = null;

        public ChargesCreateDTO Charges { get; set; } = null!;
        public OtherTotalsCreateDTO OtherTotals { get; set; } = null!;
    }
}
