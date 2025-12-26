using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SistemaPedidosReact.Server.Migrations
{
    public partial class OrderDetailCookingTime : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "OrderStateId",
                table: "Orders",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CookingTime",
                table: "OrderDetails",
                type: "int",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Parameters",
                columns: new[] { "Id", "Key", "Value" },
                values: new object[,]
                {
                    { 1, "DELAY", "" },
                    { 2, "ADDRESS", "" },
                    { 3, "WHATSAPP", "" },
                    { 4, "EMAIL", "" },
                    { 5, "PHONE", "" },
                    { 6, "INSTAGRAM", "" },
                    { 7, "SCHEDULES", "" },
                    { 8, "UPDATE MENU", "SI" },
                    { 9, "UPDATE MENU ALWAYS", "NO" },
                    { 10, "LATITUDE", "-34.91940352019461" },
                    { 11, "LONGITUDE", "-57.9503059387207" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "Parameters",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DropColumn(
                name: "CookingTime",
                table: "OrderDetails");

            migrationBuilder.AlterColumn<int>(
                name: "OrderStateId",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
