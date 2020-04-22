using Banico.Services.Interfaces;
using System.Net.Http;
using System.Threading.Tasks;

namespace Banico.Api.Services
{
    public class OEmbedService : IOEmbedService
    {
        private readonly IHttpClientFactory _clientFactory;

        public OEmbedService(IHttpClientFactory clientFactory)
        {
            _clientFactory = clientFactory;
        }

        public async Task<string> GetOEmbed(string service, string url)
        {
            string oEmbedUrl = string.Empty;

            if (service == "youtube")
            {
                oEmbedUrl = "youtube.com/oembed?url=" + url;
            }

            if (!string.IsNullOrEmpty(oEmbedUrl))
            {
                var request = new HttpRequestMessage(HttpMethod.Get, oEmbedUrl);

                var client = _clientFactory.CreateClient();

                var response = await client.SendAsync(request);

                if (response.IsSuccessStatusCode)
                {
                    return await response.Content.ReadAsStringAsync();
                }
            }

            return string.Empty;
        }
    }
}