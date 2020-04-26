using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Banico.Core.Entities
{
    // Represent AppUser in App DB (AppUser table is in Identity DB.)
    public class UserId
    {
        public string Id { get; set; }
        public ICollection<UserContent> ContentItems { get; set; }
        public ICollection<UserGroup> Groups { get; set; }
    }
}
