using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class CustomerReadPOS
    {
        [JsonPropertyName("first_name")]
        public string FirstName { get; set; } = string.Empty;
        [JsonPropertyName("last_name")]
        public string? LastName { get; set; } = null;
        [JsonPropertyName("phone_number")]
        public string? PhoneNumber { get; set; } = null;
        [JsonPropertyName("document_number")]
        public string? DocumentNumber { get; set; } = null;
        [JsonPropertyName("user_type")]
        public string? UserType { get; set; } = null; // USER_VIP
        [JsonPropertyName("email")]
        public string? Email { get; set; } = null;
    }
}
