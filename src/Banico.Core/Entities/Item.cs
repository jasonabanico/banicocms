using System;
using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class Item
    {
        public string Tenant { get; set; }
        [Key]
        public string Id { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset CreatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTimeOffset UpdatedDate { get; set;}
        public long CreatedDateTicks
        {
            get
            {
                return this.CreatedDate.Ticks;
            }
        }
        public long UpdatedDateTicks 
        {
            get
            {
                return this.UpdatedDate.Ticks;
            }
        }
   }
}