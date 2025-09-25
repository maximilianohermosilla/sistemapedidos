namespace SistemaPedidosReact.Server.DTOs
{
    public class TotalsReadDTO
    {
        public int Id { get; set; }
        public int TotalProducts { get; set; }
        public decimal TotalDiscounts { get; set; } = decimal.Zero;
        public decimal TotalOrder { get; set; } = decimal.Zero;
        public decimal TotalToPay { get; set; } = decimal.Zero;
        public int? ChargesId { get; set; } = null;
        public int? OtherTotalsId { get; set; } = null;

        public ChargesReadDTO Charges { get; set; } = null!;
        public OtherTotalsReadDTO OtherTotals { get; set; } = null!;
    }
}
