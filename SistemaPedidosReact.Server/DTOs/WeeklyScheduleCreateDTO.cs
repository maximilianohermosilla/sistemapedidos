namespace SistemaPedidosReact.Server.DTOs
{
    public class WeeklyScheduleCreateDTO
    {
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
