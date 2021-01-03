namespace API.Helpers
{
    public class EntryParams : PaginationParams
    {
        public string Username { get; set; }
        public string Container { get; set; } = "Inbox";
    }
}