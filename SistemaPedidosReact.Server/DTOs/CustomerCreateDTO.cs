namespace SistemaPedidosReact.Server.DTOs
{
    public class CustomerCreateDTO
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string? LastName { get; set; } = null;
        public string? PhoneNumber { get; set; } = null;
        public string? DocumentNumber { get; set; } = null;
        public string? UserType { get; set; } = null; // USER_VIP
        public string? Email { get; set; } = null;
    }
}
