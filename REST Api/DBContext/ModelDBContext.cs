using Microsoft.EntityFrameworkCore;
using REST_Api.Models;

namespace REST_Api.DBContext
{
    public class ModelDBContext : DbContext
    {
        public ModelDBContext(DbContextOptions<ModelDBContext> context) : base(context)
        {

        }

        public DbSet<UserModel> Users { get; set; }
    }
}
