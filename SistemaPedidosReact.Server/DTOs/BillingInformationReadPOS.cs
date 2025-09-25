using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class BillingInformationReadPOS
    {
        [JsonPropertyName("address")]
        public string Address { get; set; } = string.Empty;
        [JsonPropertyName("billing_type")]
        public string? BillingType { get; set; } = null;
        [JsonPropertyName("document_type")]
        public string? DocumentType { get; set; } = null;
        [JsonPropertyName("document_number")]
        public string? DocumentNumber { get; set; } = null;
        [JsonPropertyName("email")]
        public string? Email { get; set; } = null;
        [JsonPropertyName("name")]
        public string? Name { get; set; } = null;
        [JsonPropertyName("phone")]
        public string? Phone { get; set; } = null;
    }
}
