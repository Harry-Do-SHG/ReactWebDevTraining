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

        [HttpGet]
        public IEnumerable<Post> Get()
        {
            // Read the JSON file
            string jsonData = System.IO.File.ReadAllText(_dataFilePath);

            // Deserialize JSON data into a list of Post objects
            List<Post> posts = JsonConvert.DeserializeObject<List<Post>>(jsonData);

            return posts;
        }

        // GET api/<ValuesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
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

              // Create a new Post object from the received model
              var newPost = new Post
              {
                Id = posts.Count + 1, // Assign a new Id (you may use a different strategy for generating Ids)
                Title = post.Title,
                Content = post.Content,
                // You can add other properties as needed
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
      // Here, you would implement logic to retrieve posts from the signed-in user's friends
      // You may fetch user's friends from the database and then filter posts accordingly
      // For demonstration purposes, let's assume you have a method to get user's friends
      List<int> friendIds = GetUserFriends(userId); // Example method to get user's friend IDs

      // Read the JSON file
      string jsonData = System.IO.File.ReadAllText(_dataFilePath);

      // Deserialize JSON data into a list of Post objects
      List<Post> allPosts = JsonConvert.DeserializeObject<List<Post>>(jsonData);

      // Filter posts to include only those from user's friends
      List<Post> friendPosts = allPosts.FindAll(post => friendIds.Contains(post.UserId));

      return friendPosts;
    }

    // Example method to get user's friend IDs (replace with your actual implementation)
    private List<int> GetUserFriends(int userId)
    {
      // Implement logic to fetch user's friends from the database
      // For now, returning a dummy list of friend IDs
      return new List<int> { 2, 3, 4 }; // Example friend IDs
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
