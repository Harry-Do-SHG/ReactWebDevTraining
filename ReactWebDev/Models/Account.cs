namespace ReactWebDev.Models
{
  public class Account
  {
    public int Id { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public List<int> FriendIdList { get; set; }

    // Constructor
    public Account()
    {
      // Initialize FriendIdList as an empty list
      FriendIdList = new List<int>();
    }
  }
}
