using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class GroupsFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleContent_ContentItems_ContentId",
                table: "RoleContent");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleContent_AppRoleId_RoleId",
                table: "RoleContent");

            migrationBuilder.DropForeignKey(
                name: "FK_UserContent_ContentItems_ContentId",
                table: "UserContent");

            migrationBuilder.DropForeignKey(
                name: "FK_UserContent_AppUserId_UserId",
                table: "UserContent");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroup_Groups_GroupId",
                table: "UserGroup");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroup_AppUserId_UserId",
                table: "UserGroup");

            migrationBuilder.DropTable(
                name: "AppRoleId");

            migrationBuilder.DropTable(
                name: "AppUserId");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserGroup",
                table: "UserGroup");

            migrationBuilder.DropIndex(
                name: "IX_UserGroup_UserId",
                table: "UserGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserContent",
                table: "UserContent");

            migrationBuilder.DropIndex(
                name: "IX_UserContent_ContentId",
                table: "UserContent");

            migrationBuilder.DropIndex(
                name: "IX_UserContent_UserId",
                table: "UserContent");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleContent",
                table: "RoleContent");

            migrationBuilder.DropIndex(
                name: "IX_RoleContent_ContentId",
                table: "RoleContent");

            migrationBuilder.DropIndex(
                name: "IX_RoleContent_RoleId",
                table: "RoleContent");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "1a1677fd-0b93-4547-a741-ff4c5f705c60");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "6d4519a7-2ad1-4db8-afb9-4956f6b6ca91");

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
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "Groups");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "ContentItems");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "ContentItems");

            migrationBuilder.DropColumn(
                name: "OwnerUserIds",
                table: "Configs");

            migrationBuilder.DropColumn(
                name: "Owners",
                table: "Configs");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserGroup");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "UserContent");

            migrationBuilder.DropColumn(
                name: "ContentId",
                table: "UserContent");

            migrationBuilder.DropColumn(
                name: "ContentId",
                table: "RoleContent");

            migrationBuilder.RenameTable(
                name: "UserGroup",
                newName: "UserGroups");

            migrationBuilder.RenameTable(
                name: "UserContent",
                newName: "UserContents");

            migrationBuilder.RenameTable(
                name: "RoleContent",
                newName: "RoleContents");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroup_GroupId",
                table: "UserGroups",
                newName: "IX_UserGroups_GroupId");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserGroups",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GroupId",
                table: "UserGroups",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserContents",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ContentItemId",
                table: "UserContents",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleContents",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "RoleContents",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<string>(
                name: "ContentItemId",
                table: "RoleContents",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserGroups",
                table: "UserGroups",
                columns: new[] { "UserId", "GroupId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserContents",
                table: "UserContents",
                columns: new[] { "UserId", "ContentItemId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleContents",
                table: "RoleContents",
                columns: new[] { "RoleId", "ContentItemId" });

            migrationBuilder.CreateTable(
                name: "RoleId",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleId", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserId",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserId", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "f22233d0-5234-479b-8ac2-47759aae149e", null, new DateTimeOffset(new DateTime(2020, 4, 26, 0, 36, 3, 482, DateTimeKind.Unspecified).AddTicks(5949), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "ab74929d-9f0f-449d-ba76-8212a2d781ed", null, new DateTimeOffset(new DateTime(2020, 4, 26, 0, 36, 3, 484, DateTimeKind.Unspecified).AddTicks(2125), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_UserContents_ContentItemId",
                table: "UserContents",
                column: "ContentItemId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContents_ContentItemId",
                table: "RoleContents",
                column: "ContentItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleContents_ContentItems_ContentItemId",
                table: "RoleContents",
                column: "ContentItemId",
                principalTable: "ContentItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleContents_RoleId_RoleId",
                table: "RoleContents",
                column: "RoleId",
                principalTable: "RoleId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserContents_ContentItems_ContentItemId",
                table: "UserContents",
                column: "ContentItemId",
                principalTable: "ContentItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserContents_UserId_UserId",
                table: "UserContents",
                column: "UserId",
                principalTable: "UserId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_Groups_GroupId",
                table: "UserGroups",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroups_UserId_UserId",
                table: "UserGroups",
                column: "UserId",
                principalTable: "UserId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RoleContents_ContentItems_ContentItemId",
                table: "RoleContents");

            migrationBuilder.DropForeignKey(
                name: "FK_RoleContents_RoleId_RoleId",
                table: "RoleContents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserContents_ContentItems_ContentItemId",
                table: "UserContents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserContents_UserId_UserId",
                table: "UserContents");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_Groups_GroupId",
                table: "UserGroups");

            migrationBuilder.DropForeignKey(
                name: "FK_UserGroups_UserId_UserId",
                table: "UserGroups");

            migrationBuilder.DropTable(
                name: "RoleId");

            migrationBuilder.DropTable(
                name: "UserId");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserGroups",
                table: "UserGroups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserContents",
                table: "UserContents");

            migrationBuilder.DropIndex(
                name: "IX_UserContents_ContentItemId",
                table: "UserContents");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RoleContents",
                table: "RoleContents");

            migrationBuilder.DropIndex(
                name: "IX_RoleContents_ContentItemId",
                table: "RoleContents");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "ab74929d-9f0f-449d-ba76-8212a2d781ed");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "f22233d0-5234-479b-8ac2-47759aae149e");

            migrationBuilder.DropColumn(
                name: "ContentItemId",
                table: "UserContents");

            migrationBuilder.DropColumn(
                name: "ContentItemId",
                table: "RoleContents");

            migrationBuilder.RenameTable(
                name: "UserGroups",
                newName: "UserGroup");

            migrationBuilder.RenameTable(
                name: "UserContents",
                newName: "UserContent");

            migrationBuilder.RenameTable(
                name: "RoleContents",
                newName: "RoleContent");

            migrationBuilder.RenameIndex(
                name: "IX_UserGroups_GroupId",
                table: "UserGroup",
                newName: "IX_UserGroup_GroupId");

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Sections",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Sections",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "SectionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "SectionItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Groups",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Groups",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "ContentItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "ContentItems",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Configs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Configs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "GroupId",
                table: "UserGroup",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserGroup",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserGroup",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserContent",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "Id",
                table: "UserContent",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ContentId",
                table: "UserContent",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Id",
                table: "RoleContent",
                type: "TEXT",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "RoleId",
                table: "RoleContent",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddColumn<string>(
                name: "ContentId",
                table: "RoleContent",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserGroup",
                table: "UserGroup",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserContent",
                table: "UserContent",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RoleContent",
                table: "RoleContent",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "AppRoleId",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoleId", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserId",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserId", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "1a1677fd-0b93-4547-a741-ff4c5f705c60", null, new DateTimeOffset(new DateTime(2020, 4, 25, 23, 42, 3, 629, DateTimeKind.Unspecified).AddTicks(83), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "6d4519a7-2ad1-4db8-afb9-4956f6b6ca91", null, new DateTimeOffset(new DateTime(2020, 4, 25, 23, 42, 3, 630, DateTimeKind.Unspecified).AddTicks(5058), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_UserId",
                table: "UserGroup",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContent_ContentId",
                table: "UserContent",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContent_UserId",
                table: "UserContent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContent_ContentId",
                table: "RoleContent",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContent_RoleId",
                table: "RoleContent",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RoleContent_ContentItems_ContentId",
                table: "RoleContent",
                column: "ContentId",
                principalTable: "ContentItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_RoleContent_AppRoleId_RoleId",
                table: "RoleContent",
                column: "RoleId",
                principalTable: "AppRoleId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserContent_ContentItems_ContentId",
                table: "UserContent",
                column: "ContentId",
                principalTable: "ContentItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserContent_AppUserId_UserId",
                table: "UserContent",
                column: "UserId",
                principalTable: "AppUserId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroup_Groups_GroupId",
                table: "UserGroup",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_UserGroup_AppUserId_UserId",
                table: "UserGroup",
                column: "UserId",
                principalTable: "AppUserId",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
