using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class WeeklySchedule
    {
        [Key]
        public int Id { get; set; }
        public int DayCode { get; set; }
        public string DayWeek { get; set; } = string.Empty;
        public bool IsOpen { get; set; }
        public TimeOnly OpeningTime { get; set; }
        public TimeOnly ClosingTime { get; set; }
        public TimeOnly? OpeningScheduleTime { get; set; } = null;
        public TimeOnly? ClosingScheduleTime { get; set; } = null;
    }
}
