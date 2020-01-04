using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class OwnerUserIds : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "bcbbd786-5123-46b5-bc3c-92a2f4090fc7");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "f457c4b6-589a-4018-a41d-9e331fef6fd9");

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "ContentItems",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "f99d7323-81db-43b0-9729-bb57a40fcc0f", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 5, 20, 60, DateTimeKind.Unspecified).AddTicks(6890), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "1b996bff-6ac5-4ea6-acf3-0488e0f6ce87", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 5, 20, 61, DateTimeKind.Unspecified).AddTicks(7320), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "1b996bff-6ac5-4ea6-acf3-0488e0f6ce87");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "f99d7323-81db-43b0-9729-bb57a40fcc0f");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "ContentItems");

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "f457c4b6-589a-4018-a41d-9e331fef6fd9", null, new DateTimeOffset(new DateTime(2020, 1, 4, 0, 4, 35, 615, DateTimeKind.Unspecified).AddTicks(9940), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "bcbbd786-5123-46b5-bc3c-92a2f4090fc7", null, new DateTimeOffset(new DateTime(2020, 1, 4, 0, 4, 35, 616, DateTimeKind.Unspecified).AddTicks(9650), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }
    }
}
