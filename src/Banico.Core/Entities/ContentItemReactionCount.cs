using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Banico.Core.Entities
{
    public class ContentItemReactionCount
    {
        public string ContentItemId { get; set; }
        public string Reaction { get; set; }
        public int Count { get; set; }
        public int Score { get; set; }
    }
}