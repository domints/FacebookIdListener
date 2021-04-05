using System.IO;

namespace FacebookIdListener
{
    public class DataSaver : IDataSaver
    {
        object fileLock = new object();
        public void Store(UserData data)
        {
            lock(fileLock)
            {
                File.AppendAllText("output.csv", $"{data.UserId};{data.UserName};{data.FullName}\n");
            }
        }
    }
}