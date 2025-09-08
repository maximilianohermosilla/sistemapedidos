namespace SistemaPedidosReact.Server.DTOs
{
    public class DeliveryDiscountCreateDTO
    {
        public int Id { get; set; }
        public decimal TotalPercentageDiscount { get; set; } = decimal.Zero;
        public decimal TotalValueDiscount { get; set; } = decimal.Zero;
    }
}
