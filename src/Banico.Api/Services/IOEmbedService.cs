using System.Threading.Tasks;
using Banico.Core.Entities;

namespace Banico.Api.Services
{
    public interface IOEmbedService
    {
        Task<OEmbed> GetOEmbed(string service, string url);
    }
}