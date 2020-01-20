using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Banico.Core.Entities
{
    public class ContentItemTag
    {
        public string ContentItemId { get; set; }
        public string Tag { get; set; }
    }
}