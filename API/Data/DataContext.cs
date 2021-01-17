using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : IdentityDbContext<AppUser, AppRole, int, 
        IdentityUserClaim<int>, AppUserRole, IdentityUserLogin<int>, 
        IdentityRoleClaim<int>, IdentityUserToken<int>>
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

    // Fhotos added 12-26
        public DbSet<Fhoto> Fhotos { get; set; }
        public DbSet<Flak> Flaks { get; set; }

    // Gplaces added 12-7
        public DbSet<Gplace> Gplaces { get; set; }

    // 01-13 to try second contoller
        // public DbSet<Gplace> Gplaces { get; set; }

    // Entrys, Organization added 11-12
        public DbSet<Entry> Entrys { get; set; }
        public DbSet<Organization> Organizations { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<AppUser>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.User)
                .HasForeignKey(ur => ur.UserId)
                .IsRequired();

            builder.Entity<AppRole>()
                .HasMany(ur => ur.UserRoles)
                .WithOne(u => u.Role)
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();


            builder.Entity<UserLike>()
                .HasKey(k => new {k.SourceUserId, k.LikedUserId});

            builder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.Cascade);
            
            builder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.LikedUserId)
                .OnDelete(DeleteBehavior.Cascade);

            // Flak 11-03
            //     builder.Entity<Flak>()
            //     .HasOne(u => u.Recipient)
            //     .WithMany(m => m.FlaksReceived)
            //     .OnDelete(DeleteBehavior.Restrict);

            // builder.Entity<Flak>()
            //     .HasOne(u => u.Sender)
            //     .WithMany(m => m.FlaksSent)
            //     .OnDelete(DeleteBehavior.Restrict);

            // Message
            builder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);
        }
    }
}