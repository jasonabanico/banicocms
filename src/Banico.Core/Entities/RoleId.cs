using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Banico.Core.Entities
{
    // Represent AppRole in App DB (AppRole table is in Identity DB.)
    public class RoleId
    {
        public string Id { get; set; }
        public ICollection<RoleContent> ContentItems { get; set; }
    }
}
