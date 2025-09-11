using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class OtherTotalsReadPOS
    {
        [JsonPropertyName("tip")]
        public decimal Tip { get; set; }
    }
}
