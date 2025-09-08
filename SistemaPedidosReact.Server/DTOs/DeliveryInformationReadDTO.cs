namespace SistemaPedidosReact.Server.DTOs
{
    public class DeliveryInformationReadDTO
    {
        public int Id { get; set; }
        public string City { get; set; } = string.Empty;
        public string? CompleteAdress { get; set; } = null;
        public string? StreetNumber { get; set; } = null;
        public string? Neighborhood { get; set; } = null;
        public string? Complement { get; set; } = null;
        public string? PostalCode { get; set; } = null;
        public string? StreetName { get; set; } = null;
    }
}
