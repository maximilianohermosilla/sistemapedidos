using System.ComponentModel.DataAnnotations;

namespace SistemaPedidosReact.Server.Models
{
    public class SpecialSchedule
    {
        [Key]
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; } = string.Empty;
        public bool IsOpen { get; set; }
        public TimeOnly OpeningTime { get; set; }
        public TimeOnly ClosingTime { get; set; }
        public TimeOnly? OpeningScheduleTime { get; set; } = null;
        public TimeOnly? ClosingScheduleTime { get; set; } = null;
    }
}
