using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Banico.Core.Entities
{
    public class ContentSectionItem
    {
        [Key]
        public string Id { get; set; }
        public string ContentItemId { get; set; }
        [ForeignKey("SectionItem")]
        public string SectionItemId { get; set; }
        public SectionItem SectionItem { get; set; }
    }
}