using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Banico.Core.Entities
{
    public class UserGroup
    {
        public string UserId { get; set; }
        public UserId User { get; set; }
        public string GroupId { get; set; }
        public Group Group { get; set; }
        public bool IsAdmin { get; set; }
    }
}
