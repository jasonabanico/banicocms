using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface IConfigRepository
    {
        Task<Config> Get(string id, string module, string name);
        Task<List<Config>> GetAll();
        Task<Config> AddOrUpdate(Config config);
        Task<Config> Add(Config config);
        Task<Config> Update(Config config);
        Task<Config> Delete(string id);
    }
}