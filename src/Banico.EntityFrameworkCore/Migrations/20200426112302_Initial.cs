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
                    Id = table.Column<string>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
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
                name: "Invites",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Inviter = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Code = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invites", x => x.Id);
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
                name: "SectionItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    ParentId = table.Column<string>(nullable: true),
                    ChildCount = table.Column<int>(nullable: false),
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
                    Id = table.Column<string>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
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
                name: "ContentItems",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Tenant = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    CreatedBy = table.Column<string>(nullable: true),
                    CreatedDate = table.Column<DateTimeOffset>(nullable: false),
                    UpdatedBy = table.Column<string>(nullable: true),
                    UpdatedDate = table.Column<DateTimeOffset>(nullable: false),
                    ParentId = table.Column<string>(nullable: true),
                    ChildCount = table.Column<int>(nullable: false),
                    Alias = table.Column<string>(nullable: true),
                    Module = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true),
                    SectionItems = table.Column<string>(nullable: true),
                    GroupId = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Tags = table.Column<string>(nullable: true),
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
                    table.ForeignKey(
                        name: "FK_ContentItems_Groups_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Groups",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
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

            migrationBuilder.CreateTable(
                name: "ContentItemReaction",
                columns: table => new
                {
                    ContentItemId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: false),
                    Reaction = table.Column<string>(nullable: false),
                    Username = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentItemReaction", x => new { x.ContentItemId, x.UserId, x.Reaction });
                    table.ForeignKey(
                        name: "FK_ContentItemReaction_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentItemReactionCount",
                columns: table => new
                {
                    ContentItemId = table.Column<string>(nullable: false),
                    Reaction = table.Column<string>(nullable: false),
                    Count = table.Column<int>(nullable: false),
                    Score = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentItemReactionCount", x => new { x.ContentItemId, x.Reaction });
                    table.ForeignKey(
                        name: "FK_ContentItemReactionCount_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ContentItemTags",
                columns: table => new
                {
                    ContentItemId = table.Column<string>(nullable: false),
                    Tag = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContentItemTags", x => new { x.ContentItemId, x.Tag });
                    table.ForeignKey(
                        name: "FK_ContentItemTags_ContentItems_ContentItemId",
                        column: x => x.ContentItemId,
                        principalTable: "ContentItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "c492cde5-22a0-4edc-ae0b-c74f2bff0994", null, new DateTimeOffset(new DateTime(2020, 1, 20, 6, 13, 46, 874, DateTimeKind.Unspecified).AddTicks(4620), new TimeSpan(0, 0, 0, 0, 0)), "", "initialized", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "n" });

            migrationBuilder.InsertData(
                table: "Configs",
                columns: new[] { "Id", "CreatedBy", "CreatedDate", "Module", "Name", "OwnerUserIds", "Owners", "Tenant", "UpdatedBy", "UpdatedDate", "Value" },
                values: new object[] { "0e8337e8-a159-4454-87a3-43a6137d3de3", null, new DateTimeOffset(new DateTime(2020, 1, 20, 6, 13, 46, 876, DateTimeKind.Unspecified).AddTicks(4470), new TimeSpan(0, 0, 0, 0, 0)), "admin", "canActivate", null, null, null, null, new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)), "admin" });

            migrationBuilder.CreateIndex(
                name: "IX_ContentItems_GroupId",
                table: "ContentItems",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentSectionItems_ContentItemId",
                table: "ContentSectionItems",
                column: "ContentItemId");

            migrationBuilder.CreateIndex(
                name: "IX_ContentSectionItems_SectionItemId",
                table: "ContentSectionItems",
                column: "SectionItemId");

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
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Configs");

            migrationBuilder.DropTable(
                name: "ContentItemReaction");

            migrationBuilder.DropTable(
                name: "ContentItemReactionCount");

            migrationBuilder.DropTable(
                name: "ContentItemTags");

            migrationBuilder.DropTable(
                name: "ContentSectionItems");

            migrationBuilder.DropTable(
                name: "Follows");

            migrationBuilder.DropTable(
                name: "Invites");

            migrationBuilder.DropTable(
                name: "RoleContents");

            migrationBuilder.DropTable(
                name: "Sections");

            migrationBuilder.DropTable(
                name: "UserContents");

            migrationBuilder.DropTable(
                name: "UserGroups");

            migrationBuilder.DropTable(
                name: "SectionItems");

            migrationBuilder.DropTable(
                name: "RoleId");

            migrationBuilder.DropTable(
                name: "ContentItems");

            migrationBuilder.DropTable(
                name: "UserId");

            migrationBuilder.DropTable(
                name: "Groups");
        }
    }
}
