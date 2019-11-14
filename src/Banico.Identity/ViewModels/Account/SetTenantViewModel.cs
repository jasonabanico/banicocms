using System.ComponentModel.DataAnnotations;

namespace Banico.Identity.ViewModels.Account
{
    public class SetTenantViewModel
    {
        [Required]
        public string Tenant { get; set; }
    }
}
