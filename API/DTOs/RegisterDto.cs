using System.ComponentModel.DataAnnotations;

using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Username{get;set;}
        [Required]
       // [StringLenght(8, MinimumLenth=4)]
        public string Password{get;set;}
    }
}