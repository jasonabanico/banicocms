using System;
using System.Collections.Generic;
using System.Text;

namespace Banico.Core.Entities
{
    public class Group : Item
    {
        public ICollection<UserGroup> Users { get; set; }
    }
}
