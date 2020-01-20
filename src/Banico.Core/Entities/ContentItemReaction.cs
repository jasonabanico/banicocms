using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Banico.Core.Entities
{
    public class ContentItemReaction
    {
        public string ContentItemId { get; set; }
        public string UserId { get; set; }
        public string Username { get; set; }
        public string Reaction { get; set; }
    }
}