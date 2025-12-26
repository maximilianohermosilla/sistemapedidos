using SistemaPedidosReact.Server.Helpers;
using System.Text.Json.Serialization;

namespace SistemaPedidosReact.Server.DTOs
{
    public class WeeklyScheduleReadDTO
    {
        public int Id { get; set; }
        public int DayCode { get; set; }
        public string DayWeek { get; set; } = string.Empty;
        public bool IsOpen { get; set; }
        [JsonConverter(typeof(TimeOnlyConverter))]
        public TimeOnly OpeningTime { get; set; }
        [JsonConverter(typeof(TimeOnlyConverter))]
        public TimeOnly ClosingTime { get; set; }
        [JsonConverter(typeof(TimeOnlyConverter))]
        public TimeOnly? OpeningScheduleTime { get; set; } = null;
        [JsonConverter(typeof(TimeOnlyConverter))]
        public TimeOnly? ClosingScheduleTime { get; set; } = null;
    }
}
