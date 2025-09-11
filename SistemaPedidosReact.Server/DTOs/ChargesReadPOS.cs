using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class ChargesReadPOS
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonPropertyName("shipping")]
        public decimal Shipping { get; set; }
        [JsonPropertyName("service_fee")]
        public decimal ServiceFee { get; set; }
    }
}
