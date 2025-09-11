using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class DeliveryInformationReadPOS
    {
        [JsonPropertyName("city")]
        public string City { get; set; } = string.Empty;
        [JsonPropertyName("complete_address")]
        public string? CompleteAdress { get; set; } = null;
        [JsonPropertyName("street_number")]
        public string? StreetNumber { get; set; } = null;
        [JsonPropertyName("neighborhood")]
        public string? Neighborhood { get; set; } = null;
        [JsonPropertyName("complement")]
        public string? Complement { get; set; } = null;
        [JsonPropertyName("postal_code")]
        public string? PostalCode { get; set; } = null;
        [JsonPropertyName("street_name")]
        public string? StreetName { get; set; } = null;
    }
}
