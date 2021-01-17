using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{  
    public class Gplace21Repository : IGplace21Repository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public Gplace21Repository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

    // first method - - need to add Entry to datacontext & appusers for ICollections
        public void AddGplace21(Gplace gplace)
        {

            _context.Gplaces.Add(gplace);
        }

    // // second method
        public void DeleteGplace21(Gplace gplace)
        {
            _context.Gplaces.Remove(gplace);
        }
        
    // third method
        public void UpdateGplace21(Gplace gplace)
        {
            _context.Entry(gplace).State = EntityState.Modified;
        }
    // fifth method
        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    
    }
}