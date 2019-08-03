using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class SectionItemChildCount : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "1d570ce0-d341-47cf-817a-1483ecd83a11");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "e32cc7ca-5600-449d-9a11-6219c931dc06");

            migrationBuilder.AddColumn<int>(
                name: "ChildCount",
                table: "SectionItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "164604a4-bebb-49cf-a91a-97c7759d2525", null, new DateTimeOffset(new DateTime(2019, 8, 3, 13, 40, 36, 73, DateTimeKind.Unspecified).AddTicks(8490), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "95a50705-5d6e-48c4-ad4c-d2a27a379e01", null, new DateTimeOffset(new DateTime(2019, 8, 3, 13, 40, 36, 75, DateTimeKind.Unspecified).AddTicks(980), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "164604a4-bebb-49cf-a91a-97c7759d2525");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "95a50705-5d6e-48c4-ad4c-d2a27a379e01");

            migrationBuilder.DropColumn(
                name: "ChildCount",
                table: "SectionItems");

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "e32cc7ca-5600-449d-9a11-6219c931dc06", null, new DateTimeOffset(new DateTime(2019, 8, 3, 13, 8, 24, 291, DateTimeKind.Unspecified).AddTicks(5280), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "1d570ce0-d341-47cf-817a-1483ecd83a11", null, new DateTimeOffset(new DateTime(2019, 8, 3, 13, 8, 24, 292, DateTimeKind.Unspecified).AddTicks(4480), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }
    }
}
