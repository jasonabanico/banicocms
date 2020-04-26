using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class Groups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropColumn(
            //     name: "OwnerUserIds",
            //     table: "Sections");

            // migrationBuilder.DropColumn(
            //     name: "Owners",
            //     table: "Sections");

            // migrationBuilder.DropColumn(
            //     name: "OwnerUserIds",
            //     table: "SectionItems");

            // migrationBuilder.DropColumn(
            //     name: "Owners",
            //     table: "SectionItems");

            // migrationBuilder.DropColumn(
            //     name: "OwnerUserIds",
            //     table: "ContentItems");

            // migrationBuilder.DropColumn(
            //     name: "OwnerUserIds",
            //     table: "Configs");

            // migrationBuilder.DropColumn(
            //     name: "Owners",
            //     table: "Configs");

            // migrationBuilder.DropColumn(
            //     name: "Owners",
            //     table: "ContentItems");

            migrationBuilder.AddColumn<string>(
                name: "GroupId",
                table: "ContentItems",
                nullable: true);

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

            migrationBuilder.CreateTable(
                name: "RoleContents",
                columns: table => new
                {
                    RoleId = table.Column<string>(nullable: false),
                    ContentItemId = table.Column<string>(nullable: false),
                    Read = table.Column<bool>(nullable: false),
                    Write = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleContents", x => new { x.RoleId, x.ContentItemId });
                    table.ForeignKey(
                        name: "FK_RoleContents_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleContents_RoleId_RoleId",
                        column: x => x.RoleId,
                        principalTable: "RoleId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserContents",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    ContentItemId = table.Column<string>(nullable: false),
                    Read = table.Column<bool>(nullable: false),
                    Write = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserContents", x => new { x.UserId, x.ContentItemId });
                    table.ForeignKey(
                        name: "FK_UserContents_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserContents_UserId_UserId",
                        column: x => x.UserId,
                        principalTable: "UserId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserGroups",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    GroupId = table.Column<string>(nullable: false),
                    IsAdmin = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserGroups", x => new { x.UserId, x.GroupId });
                    table.ForeignKey(
                        name: "FK_UserGroups_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserGroups_UserId_UserId",
                        column: x => x.UserId,
                        principalTable: "UserId",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContentItems_GroupId",
                table: "ContentItems",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleContents_ContentItemId",
                table: "RoleContents",
                column: "ContentItemId");

            migrationBuilder.CreateIndex(
                name: "IX_UserContents_ContentItemId",
                table: "UserContents",
                column: "ContentItemId");

            migrationBuilder.CreateIndex(
                name: "IX_UserGroups_GroupId",
                table: "UserGroups",
                column: "GroupId");

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
                name: "RoleContents");

            migrationBuilder.DropTable(
                name: "UserContents");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "RoleId");

            migrationBuilder.DropTable(
                name: "Groups");

            migrationBuilder.DropTable(
                name: "UserId");

            migrationBuilder.DropIndex(
                name: "IX_ContentItems_GroupId",
                table: "ContentItems");

            migrationBuilder.RenameColumn(
                name: "GroupId",
                table: "ContentItems",
                newName: "Owners");

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
                table: "ContentItems",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OwnerUserIds",
                table: "Configs",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Owners",
                table: "Configs",
                nullable: true);
        }
    }
}
