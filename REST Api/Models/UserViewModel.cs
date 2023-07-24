using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace REST_Api.Models
{
    [PrimaryKey("username")]
    [Table("User")]
    public class UserModel
    {
        [Required]
        [MaxLength(20)]
        public string username { get; set; }

        [MaxLength(50)]
        public string email { get; set; }

        [MaxLength(20)]
        public string phoneNo { get; set; }

        [MaxLength(100)]
        public string skillset { get; set; }

        [MaxLength(100)]
        public string hobby { get; set; }
    }
}
