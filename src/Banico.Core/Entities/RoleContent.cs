using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Banico.Core.Entities
{
    public class RoleContent
    {
        public string RoleId { get; set; }
        public RoleId Role { get; set; }
        public string ContentItemId { get; set; }
        public ContentItem ContentItem { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
    }
}
