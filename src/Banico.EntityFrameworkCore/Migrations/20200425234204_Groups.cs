using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class Groups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "0e8337e8-a159-4454-87a3-43a6137d3de3");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "c492cde5-22a0-4edc-ae0b-c74f2bff0994");

            migrationBuilder.AddColumn<string>(
                name: "GroupId",
                table: "ContentItems",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AppRoleId",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppRoleId", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AppUserId",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppUserId", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Follows",
                columns: table => new
                {
                    Follower = table.Column<string>(nullable: true),
                    Following = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateTable(
                name: "Groups",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    Owners = table.Column<string>(nullable: true),
                    OwnerUserIds = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Groups", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleContent",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: true),
                    ContentId = table.Column<string>(nullable: true),
                    Read = table.Column<bool>(nullable: false),
                    Write = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RoleContent_ContentItems_ContentId",
                        column: x => x.ContentId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_RoleContent_AppRoleId_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AppRoleId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserContent",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    ContentId = table.Column<string>(nullable: true),
                    Read = table.Column<bool>(nullable: false),
                    Write = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserContent", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserContent_ContentItems_ContentId",
                        column: x => x.ContentId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserContent_AppUserId_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUserId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserGroup",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true),
                    GroupId = table.Column<string>(nullable: true),
                    IsAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroup", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserGroup_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_UserGroup_AppUserId_UserId",
                        column: x => x.UserId,
                        principalTable: "AppUserId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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
                name: "IX_ContentItems_GroupId",
                table: "ContentItems",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContent_ContentId",
                table: "RoleContent",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContent_RoleId",
                table: "RoleContent",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContent_ContentId",
                table: "UserContent",
                column: "ContentId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContent_UserId",
                table: "UserContent",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_GroupId",
                table: "UserGroup",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroup_UserId",
                table: "UserGroup",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContentItems_Groups_GroupId",
                table: "ContentItems",
                column: "GroupId",
                principalTable: "Groups",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentItems_Groups_GroupId",
                table: "ContentItems");

            migrationBuilder.DropTable(
                name: "Follows");

            migrationBuilder.DropTable(
                name: "RoleContent");

            migrationBuilder.DropTable(
                name: "UserContent");

            migrationBuilder.DropTable(
                name: "UserGroup");

            migrationBuilder.DropTable(
                name: "AppRoleId");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "AppUserId");

            migrationBuilder.DropIndex(
                name: "IX_ContentItems_GroupId",
                table: "ContentItems");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "1a1677fd-0b93-4547-a741-ff4c5f705c60");

            migrationBuilder.DeleteData(
                table: "Configs",
                keyColumn: "Id",
                keyValue: "6d4519a7-2ad1-4db8-afb9-4956f6b6ca91");

            migrationBuilder.DropColumn(
                name: "GroupId",
                table: "ContentItems");

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "c492cde5-22a0-4edc-ae0b-c74f2bff0994", null, new DateTimeOffset(new DateTime(2020, 1, 20, 6, 13, 46, 874, DateTimeKind.Unspecified).AddTicks(4620), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "0e8337e8-a159-4454-87a3-43a6137d3de3", null, new DateTimeOffset(new DateTime(2020, 1, 20, 6, 13, 46, 876, DateTimeKind.Unspecified).AddTicks(4470), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });
        }
    }
}
