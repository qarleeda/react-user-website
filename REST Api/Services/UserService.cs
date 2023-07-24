using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using REST_Api.DBContext;
using REST_Api.Models;
using System.Collections.Generic;

namespace REST_Api.Services
{
    public interface IUserService
    {
        Task<List<UserModel>> GetUsers();

        Task<UserModel> GetUserInfo(string username);

        Task<bool> AddUser(UserModel model);

        Task<bool> UpdateUser(UserModel model);

        Task<bool> DeleteUser(string username);
    }

    public class UserService : IUserService
    {
        private readonly ModelDBContext context;
        public UserService(ModelDBContext _context)
        {
            context = _context;
        }

        public async Task<List<UserModel>> GetUsers()
        {
            try
            {
                var data = context.Users.AsEnumerable().OrderBy(x => x.username);

                List<UserModel> users = new List<UserModel>();

                if (data != null)
                {
                    foreach (var row in data)
                    {
                        UserModel user = new UserModel{ 
                            username = row.username,
                            email = row.email,
                            phoneNo = row.phoneNo,
                            skillset = row.skillset,
                            hobby = row.hobby
                        };
                        users.Add(user);
                    }
                }

                await Task.CompletedTask;

                return users;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<UserModel> GetUserInfo(string username)
        {
            try
            {
                var data = context.Users.FirstOrDefault(x => x.username == username);

                if (data != null)
                {
                    UserModel user = new UserModel{ 
                        username = data.username,
                        email = data.email,
                        phoneNo = data.phoneNo,
                        skillset = data.skillset,
                        hobby = data.hobby
                    };
                    return user;
                }
                return null;
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        public async Task<bool> AddUser(UserModel user)
        {
            try
            {
                if(context.Users.FirstOrDefault(x => x.username == user.username) == null)
                {
                    UserModel newUser = new UserModel
                    {
                        username = user.username, email = user.email, phoneNo = user.phoneNo, hobby = user.hobby, skillset = user.skillset
                    };

                    context.Users.Add(newUser);

                    await context.SaveChangesAsync();
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> UpdateUser(UserModel user)
        {
            try
            {
                var userData = context.Users.FirstOrDefault(x => x.username == user.username);
                if(userData != null)
                {
                    userData.email = user.email;
                    userData.phoneNo = user.phoneNo;
                    userData.hobby = user.hobby;
                    userData.skillset = user.skillset;

                    context.Users.Update(userData);

                    await context.SaveChangesAsync();
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

        public async Task<bool> DeleteUser(string username)
        {
            try
            {
                var userData = context.Users.FirstOrDefault(x => x.username == username);
                if(userData != null)
                {
                    context.Users.Remove(userData);

                    await context.SaveChangesAsync();
                }
                else
                {
                    return false;
                }

                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }
    }
}
