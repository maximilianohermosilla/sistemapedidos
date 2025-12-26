using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaPedidosReact.Server.Migrations
{
    public partial class WeeklyAndSpecialSchedules : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SpecialSchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Date = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsOpen = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    OpeningTime = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    ClosingTime = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    OpeningScheduleTime = table.Column<TimeOnly>(type: "time(6)", nullable: true),
                    ClosingScheduleTime = table.Column<TimeOnly>(type: "time(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecialSchedules", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "WeeklySchedules",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    DayCode = table.Column<int>(type: "int", nullable: false),
                    DayWeek = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IsOpen = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    OpeningTime = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    ClosingTime = table.Column<TimeOnly>(type: "time(6)", nullable: false),
                    OpeningScheduleTime = table.Column<TimeOnly>(type: "time(6)", nullable: true),
                    ClosingScheduleTime = table.Column<TimeOnly>(type: "time(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklySchedules", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "SpecialSchedules",
                columns: new[] { "Id", "ClosingScheduleTime", "ClosingTime", "Date", "Description", "IsOpen", "OpeningScheduleTime", "OpeningTime" },
                values: new object[,]
                {
                    { 1, new TimeOnly(0, 0, 0), new TimeOnly(22, 30, 0), new DateTime(2025, 12, 25, 0, 0, 0, 0, DateTimeKind.Unspecified), "Navidad", false, new TimeOnly(10, 30, 0), new TimeOnly(0, 0, 0) },
                    { 2, new TimeOnly(0, 0, 0), new TimeOnly(22, 30, 0), new DateTime(2026, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Año Nuevo", false, new TimeOnly(10, 30, 0), new TimeOnly(0, 0, 0) },
                    { 3, new TimeOnly(18, 0, 0), new TimeOnly(18, 0, 0), new DateTime(2025, 12, 24, 0, 0, 0, 0, DateTimeKind.Unspecified), "Nochebuena", true, new TimeOnly(10, 30, 0), new TimeOnly(10, 0, 0) },
                    { 4, new TimeOnly(18, 0, 0), new TimeOnly(18, 0, 0), new DateTime(2025, 12, 31, 0, 0, 0, 0, DateTimeKind.Unspecified), "Fin de año", true, new TimeOnly(10, 30, 0), new TimeOnly(10, 0, 0) }
                });

            migrationBuilder.InsertData(
                table: "WeeklySchedules",
                columns: new[] { "Id", "ClosingScheduleTime", "ClosingTime", "DayCode", "DayWeek", "IsOpen", "OpeningScheduleTime", "OpeningTime" },
                values: new object[,]
                {
                    { 1, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 0, "Domingo", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 2, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 1, "Lunes", false, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 3, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 2, "Martes", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 4, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 3, "Miércoles", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 5, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 4, "Jueves", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 6, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 5, "Viernes", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) },
                    { 7, new TimeOnly(20, 0, 0), new TimeOnly(22, 30, 0), 6, "Sábado", true, new TimeOnly(10, 30, 0), new TimeOnly(19, 45, 0) }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SpecialSchedules");

            migrationBuilder.DropTable(
                name: "WeeklySchedules");
        }
    }
}
