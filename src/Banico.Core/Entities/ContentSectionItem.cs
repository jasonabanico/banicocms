using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class ContentSectionItem
    {
        [Key]
        public string Id { get; set; }
        public string ContentItemId { get; set; }
        public SectionItem SectionItem { get; set; }
    }
}