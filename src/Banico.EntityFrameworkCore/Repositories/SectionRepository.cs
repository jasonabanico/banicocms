using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq.Expressions;
using System;
using Banico.Core.Entities;
using Banico.Core.Repositories;

namespace Banico.EntityFrameworkCore.Repositories
{
    public class SectionRepository : ISectionRepository
    {
        public AppDbContext DbContext { get; set; }

        public SectionRepository(AppDbContext dbContext)
        {
            this.DbContext = dbContext;
        }

        public async Task<List<Section>> Get(
            string id,
            string module,
            string name)
        {
            var sections = from section in this.DbContext.Sections
                where 
                    (section.Id == id || 
                        string.IsNullOrEmpty(id)) &&
                    (section.Modules.Contains(module) || 
                        string.IsNullOrEmpty(section.Modules) ||
                        string.IsNullOrEmpty(module)) &&
                    (section.Name == name ||
                        string.IsNullOrEmpty(name))
                select section;
 
            return await sections.ToListAsync<Section>();
        }

        public async Task<Section> AddOrUpdate(Section section)
        {
            if (string.IsNullOrEmpty(section.Id)) 
            {
                return await this.Add(section);
            }
            else
            {
                return await this.Update(section);
            }
        }

        public async Task<Section> Add(Section section)
        {
            section.Id = Guid.NewGuid().ToString();
            this.DbContext.Sections.Add(section);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return section;
            }

            return new Section();
        }

        public async Task<Section> Update(Section section)
        {
            var storedSection = (await this.Get(section.Id,
                string.Empty, string.Empty))
                .FirstOrDefault();

            if (storedSection != null)
            {
                storedSection.Name = section.Name;
                storedSection.Modules = section.Modules;
                storedSection.UpdatedBy = section.UpdatedBy;
                storedSection.UpdatedDate = section.UpdatedDate;
                
                var result = await this.DbContext.SaveChangesAsync();

                if (result > 0)
                {
                    return section;
                }
            }

            return new Section();
        }

        public async Task<Section> Delete(string name)
        {
            var section = (await this.Get(string.Empty, string.Empty, name))
                .FirstOrDefault();
            this.DbContext.Remove(section);
            var result = await this.DbContext.SaveChangesAsync();

            if (result > 0)
            {
                return section;
            }

            return new Section();
        }
    }
}