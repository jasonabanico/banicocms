using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;

namespace Banico.Core.Repositories
{
    public interface ISectionItemRepository
    {
        void ParsePath(
            string inputPath, 
            out string[] sections, 
            out string[] pathUrls, 
            out string[] aliases);
        Task<List<SectionItem>> Get(
            string tenant,
            string id,
            string section,
            string pathUrl,
            string alias,
            string name,
            string parentId,
            bool isRoot);
        Task<SectionItem> AddOrUpdate(SectionItem section, bool isSectionItemAdmin);
        Task<SectionItem> Add(SectionItem section, bool isSectionItemAdmin);
        Task<SectionItem> Update(SectionItem section, bool isSectionItemAdmin);
        Task<SectionItem> Delete(string id, bool isSectionItemAdmin);
    }
}