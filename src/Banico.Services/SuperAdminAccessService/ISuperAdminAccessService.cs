using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace Banico.Services.Interfaces
{
    public interface ISuperAdminAccessService
    {
        bool IsSuperAdminUsername(string username);
        Task<bool> IsSuperAdmin(IPrincipal user);
    }
}