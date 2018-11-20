using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Banico.Core.Entities;
using Banico.Core.Repositories;
using Microsoft.AspNetCore.Http;

namespace Banico.Api.Services
{
    public interface IAccessService
    {
        string GetCurrentUserId();
        bool IsUser();
        bool IsAdmin();
        Task<string> GetUsername();
        Task<bool> Allowed(ContentItem contentItem);
    }
}
