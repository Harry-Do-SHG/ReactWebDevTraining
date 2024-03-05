using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReactWebDev.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ReactWebDev.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class PostController : ControllerBase
  {
    private static string _dataFilePath = Path.Combine("Data", "posts.json");
    private static string _accountsFilePath = Path.Combine("Data", "accounts.json");

    [HttpGet]
    public IEnumerable<Post> Get()
    {
      // Read the JSON file
      string jsonData = System.IO.File.ReadAllText(_dataFilePath);

      // Deserialize JSON data into a list of Post objects
      List<Post> posts = JsonConvert.DeserializeObject<List<Post>>(jsonData);

      return posts;
    }

    // POST api/<ValuesController>
    [HttpPost]
    public IEnumerable<Post> Post([FromBody] Post post)
    {
      List<Post> posts = new List<Post>();
      if (post != null)
      {
        try
        {
          // Read existing JSON data from file
          string jsonData = System.IO.File.ReadAllText(_dataFilePath);

          // Deserialize JSON data into a list of posts
          posts = JsonConvert.DeserializeObject<List<Post>>(jsonData) ?? new List<Post>();
          // Find the maximum ID in the list of accounts
          int maxId = posts.Count > 0 ? posts.Max(a => a.Id) : 0;

          // Create a new Post object from the received model
          var newPost = new Post
          {
            Id = maxId + 1, // Assign a new Id (you may use a different strategy for generating Ids)
            Title = post.Title,
            Content = post.Content,
            Username = post.Username,
          };

          // Add the new post to the list of posts
          posts.Add(newPost);

          // Serialize the updated list of posts back to JSON format
          string updatedJsonData = JsonConvert.SerializeObject(posts, Formatting.Indented);

          // Write the updated JSON data back to the file
          System.IO.File.WriteAllText(_dataFilePath, updatedJsonData);

          return posts;
        }
        catch (Exception ex)
        {

        }
      }
      return posts;
    }

    // GET api/post/friends/{userId}
    [HttpGet("friends/{userId}")]
    public IEnumerable<Post> GetPostsFromFriends(int userId)
    {
      // Read accounts data to map usernames to user IDs
      string accountsJson = System.IO.File.ReadAllText(_accountsFilePath);
      List<Account> accounts = JsonConvert.DeserializeObject<List<Account>>(accountsJson);

      // Get friend IDs for the given user
      List<int> friendIds = GetUserFriends(accounts, userId);

      // Read posts data
      string postsJson = System.IO.File.ReadAllText(_dataFilePath);
      List<Post> allPosts = JsonConvert.DeserializeObject<List<Post>>(postsJson);

      // Filter posts to include only those from user's friends
      List<Post> friendPosts = allPosts.Where(post => friendIds.Contains(GetUserIdByUsername(accounts, post.Username))).ToList();

      return friendPosts;
    }

    private int GetUserIdByUsername(List<Account> accounts, string username)
    {
      // Find user ID based on username
      Account user = accounts.FirstOrDefault(a => a.Username == username);
      return user?.Id ?? -1; // Return -1 if user not found (you can handle this case accordingly)
    }

    // Example method to get user's friend IDs (replace with your actual implementation)
    private List<int> GetUserFriends(List<Account> accounts, int userId)
    {
      Account user = accounts.FirstOrDefault(a => a.Id == userId);
      return user.FriendIdList;
    }

    // PUT api/<ValuesController>/5
    [HttpPut("{id}")]
    public void Put(int id, [FromBody] string value)
    {
    }

    // DELETE api/<ValuesController>/5
    [HttpDelete("{id}")]
    public void Delete(int id)
    {
    }
  }
}
