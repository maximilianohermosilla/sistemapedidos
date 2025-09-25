using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class StoreReadPOS
    {
        [JsonPropertyName("internal_id")]
        public string InternalId { get; set; } = string.Empty;
        [JsonPropertyName("external_id")]
        public string ExternalId { get; set; } = string.Empty;
        [JsonPropertyName("name")]
        public string Name { get; set; } = string.Empty;
    }
}
