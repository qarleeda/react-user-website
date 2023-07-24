using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using REST_Api.DBContext;
using REST_Api.Models;
using REST_Api.Services;
using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Cors.Infrastructure;

namespace REST_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController: ControllerBase
    {
        private readonly IUserService service;

        public UserController(IUserService _service)
        {
            this.service = _service;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            try
            {
                return Ok(await service.GetUsers());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("GetUserInfo/{username}")]
        public async Task<IActionResult> GetUserInfo(string username)
        {
            try
            {
                return Ok(await service.GetUserInfo(username));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddUser")]
        public async Task<IActionResult> AddUser([FromBody] UserModel user)
        {
            try
            {
                bool result = await service.AddUser(user);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return Conflict();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] UserModel user)
        {
            try
            {
                bool result = await service.UpdateUser(user);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("DeleteUser/{username}")]
        public async Task<IActionResult> DeleteUser(string username)
        {
            try
            {
                bool result = await service.DeleteUser(username);
                if (result)
                {
                    return Ok();
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
