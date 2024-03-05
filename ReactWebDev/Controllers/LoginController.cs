using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ReactWebDev.Models;

namespace ReactWebDev.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class LoginController : ControllerBase
  {
    private static string _dataFilePath = Path.Combine("Data", "accounts.json");

    [HttpGet]
    public IEnumerable<Account> Get()
    {
      // Read the JSON file
      string jsonData = System.IO.File.ReadAllText(_dataFilePath);

      // Deserialize JSON data into a list of Post objects
      List<Account> accounts = JsonConvert.DeserializeObject<List<Account>>(jsonData);

      return accounts;
    }

    // GET api/<ValuesController>/5
    [HttpGet("{id}")]
    public string Get(int id)
    {
      return "value";
    }

    // POST api/<ValuesController>
    [HttpPost]
    public IEnumerable<Account> Post([FromBody] Account account)
    {
      List<Account> accounts = new List<Account>();
      if (account != null)
      {
        try
        {
          // Read existing JSON data from file
          string jsonData = System.IO.File.ReadAllText(_dataFilePath);

          // Deserialize JSON data into a list of posts
          accounts = JsonConvert.DeserializeObject<List<Account>>(jsonData) ?? new List<Account>();

          // Find the maximum ID in the list of accounts
          int maxId = accounts.Count > 0 ? accounts.Max(a => a.Id) : 0;

          // Create a new Post object from the received model
          var newAccount = new Account
          {
            Id = maxId + 1,
            Username = account.Username,
            Password = account.Password,
            FriendIdList = new List<int>()
        };

          // Add the new post to the list of posts
          accounts.Add(newAccount);

          // Serialize the updated list of posts back to JSON format
          string updatedJsonData = JsonConvert.SerializeObject(accounts, Formatting.Indented);

          // Write the updated JSON data back to the file
          System.IO.File.WriteAllText(_dataFilePath, updatedJsonData);

          return accounts;
        }
        catch (Exception ex)
        {

        }
      }
      return accounts;

    }
  }
}
