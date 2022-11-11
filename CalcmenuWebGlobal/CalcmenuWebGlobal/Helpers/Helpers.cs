using CalcmenuWebGlobal.Models;
using System;
using System.IO;

namespace CalcmenuWebGlobal.Helpers
{
    public class Helpers
    {
        public bool UploadUserImage(Users paramUser)
        {
            try
            {
                if (paramUser.Image.Src != "")
                {
                    int count = 1;
                    string filePath = Environment.CurrentDirectory.ToString() + "\\Files\\";
                    string fileExtension = Path.GetExtension(paramUser.Image.Name);
                    string fileName = Path.GetFileNameWithoutExtension(paramUser.Image.Name) + fileExtension;
                    string fileNameOnly = Path.GetFileNameWithoutExtension(paramUser.Image.Name);
                    string filePathName = filePath + fileName;
                    byte[] FileAsByteArray;

                    while (File.Exists(filePathName))
                    {
                        string tempFileName = string.Format("{0}({1})", fileNameOnly, count++);
                        filePathName = filePath + tempFileName + fileExtension;
                    }

                    if (paramUser.Image.Src.Contains(","))
                    {
                        paramUser.Image.Src = paramUser.Image.Src.Substring(paramUser.Image.Src.IndexOf(",") + 1);
                    }

                    FileAsByteArray = Convert.FromBase64String(paramUser.Image.Src);

                    using (var fs = new FileStream(filePathName, FileMode.CreateNew))
                    {
                        fs.Write(FileAsByteArray, 0, FileAsByteArray.Length);
                    }

                }

                return true;

            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}
