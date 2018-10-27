using System.ComponentModel.DataAnnotations;

namespace Banico.Core.Entities
{
    public class Config : Item
    {
        public string Module { get; set; }
        public string Value { get; set; }
    }
}