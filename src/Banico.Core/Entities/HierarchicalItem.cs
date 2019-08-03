using System;

namespace Banico.Core.Entities
{
    public class HierarchicalItem : Item
    {
        public string ParentId { get; set; }
        public int ChildCount { get; set; }
   }
}