using Banico.Core.Entities;
using Banico.Services.Interfaces;

namespace Banico.Services
{
    public class ItemSecurityService : IItemSecurityService
    {
        public IClaimsService _claimsService;

        public ItemSecurityService(IClaimsService claimsService)
        {
            _claimsService = claimsService;
        }

        public bool IsAuthorized(Item item, AppUser user)
        {
            if (item.CreatedBy == user.Id)
            {
                return true;
            }

            if (_claimsService.IsSuperAdmin(user.UserName))
            {
                return true;
            }

            return false;
        }
    }
}