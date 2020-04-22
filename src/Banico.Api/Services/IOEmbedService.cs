using System.Threading.Tasks;

namespace Banico.Api.Services
{
    public interface IOEmbedService
    {
        Task<string> GetOEmbed(string service, string url);
    }
}