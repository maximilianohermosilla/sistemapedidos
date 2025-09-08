namespace SistemaPedidosReact.Server.DTOs
{
    public class BillingInformationCreateDTO
    {
        public int Id { get; set; }
        public string Address { get; set; } = string.Empty;
        public string? BillingType { get; set; } = null;
        public string? DocumentType { get; set; } = null;
        public string? DocumentNumber { get; set; } = null;
        public string? Email { get; set; } = null;
        public string? Name { get; set; } = null;
        public string? Phone { get; set; } = null;
        public int? OrderDetailId { get; set; }
    }
}
