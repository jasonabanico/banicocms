using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Banico.EntityFrameworkCore.Migrations
{
    public partial class Initial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Configs",
                columns: table => new
                {
                    Tenant = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    Module = table.Column<string>(nullable: true),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Configs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContentItems",
                columns: table => new
                {
                    Tenant = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    ParentId = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Module = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Attribute01 = table.Column<string>(nullable: true),
                    Attribute02 = table.Column<string>(nullable: true),
                    Attribute03 = table.Column<string>(nullable: true),
                    Attribute04 = table.Column<string>(nullable: true),
                    Attribute05 = table.Column<string>(nullable: true),
                    Attribute06 = table.Column<string>(nullable: true),
                    Attribute07 = table.Column<string>(nullable: true),
                    Attribute08 = table.Column<string>(nullable: true),
                    Attribute09 = table.Column<string>(nullable: true),
                    Attribute10 = table.Column<string>(nullable: true),
                    Attribute11 = table.Column<string>(nullable: true),
                    Attribute12 = table.Column<string>(nullable: true),
                    Attribute13 = table.Column<string>(nullable: true),
                    Attribute14 = table.Column<string>(nullable: true),
                    Attribute15 = table.Column<string>(nullable: true),
                    Attribute16 = table.Column<string>(nullable: true),
                    Attribute17 = table.Column<string>(nullable: true),
                    Attribute18 = table.Column<string>(nullable: true),
                    Attribute19 = table.Column<string>(nullable: true),
                    Attribute20 = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Inviter = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SectionItems",
                columns: table => new
                {
                    Tenant = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    ParentId = table.Column<string>(nullable: true),
                    Section = table.Column<string>(nullable: true),
                    PathUrl = table.Column<string>(nullable: true),
                    PathName = table.Column<string>(nullable: true),
                    Alias = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SectionItems", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Sections",
                columns: table => new
                {
                    Tenant = table.Column<string>(nullable: true),
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    Modules = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sections", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContentSectionItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ContentItemId = table.Column<string>(nullable: true),
                    SectionItemId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentSectionItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ContentSectionItems_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ContentSectionItems_SectionItems_SectionItemId",
                        column: x => x.SectionItemId,
                        principalTable: "SectionItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "21165d70-36be-4d3d-81a8-b7004d44e047", null, new DateTimeOffset(new DateTime(2018, 12, 7, 23, 30, 33, 882, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "51fcbf56-7197-40fa-aec0-7b6aba3287da", null, new DateTimeOffset(new DateTime(2018, 12, 7, 23, 30, 33, 886, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_ContentSectionItems_ContentItemId",
                table: "ContentSectionItems",
                column: "ContentItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentSectionItems_SectionItemId",
                table: "ContentSectionItems",
                column: "SectionItemId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configs");

            migrationBuilder.DropTable(
                name: "ContentSectionItems");

            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "ContentItems");

            migrationBuilder.DropTable(
                name: "SectionItems");
        }
    }
}
