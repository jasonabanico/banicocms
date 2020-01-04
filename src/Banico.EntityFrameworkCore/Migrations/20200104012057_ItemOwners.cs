using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class ItemOwners : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "1b996bff-6ac5-4ea6-acf3-0488e0f6ce87");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "f99d7323-81db-43b0-9729-bb57a40fcc0f");

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Sections",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Sections",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "SectionItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "SectionItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Configs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Configs",
                nullable: true);

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "f4c4f695-f4be-4bf8-9058-5eb920bf0c28", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 20, 56, 730, DateTimeKind.Unspecified).AddTicks(5090), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "89a36b5a-dc6a-4922-b2c5-cc6f6f2ab61a", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 20, 56, 731, DateTimeKind.Unspecified).AddTicks(9890), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "89a36b5a-dc6a-4922-b2c5-cc6f6f2ab61a");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "f4c4f695-f4be-4bf8-9058-5eb920bf0c28");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "Sections");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "SectionItems");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "SectionItems");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "Configs");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "Configs");

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "f99d7323-81db-43b0-9729-bb57a40fcc0f", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 5, 20, 60, DateTimeKind.Unspecified).AddTicks(6890), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "1b996bff-6ac5-4ea6-acf3-0488e0f6ce87", null, new DateTimeOffset(new DateTime(2020, 1, 4, 1, 5, 20, 61, DateTimeKind.Unspecified).AddTicks(7320), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }
    }
}
