using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Banico.Core.Entities
{
    public class UserContent
    {
        public string UserId { get; set; }
        public UserId User { get; set; }
        public string ContentItemId { get; set; }
        public ContentItem ContentItem { get; set; }
        public bool Read { get; set; }
        public bool Write { get; set; }
    }
}
