using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Net;

namespace StreamClient
{
    public partial class Form1 : Form
    {

        public Form1()
        {
            InitializeComponent();
            backgroundWorker1.RunWorkerAsync();
        }

        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {

            TcpListener listener = new TcpListener(IPAddress.Any, 20000);
            listener.Start();

            while (!listener.Pending())
            {
                if (backgroundWorker1.CancellationPending)
                {
                    listener.Stop();
                    e.Cancel = true;
                    return;
                }
            }

            TcpClient client = listener.AcceptTcpClient();

            using (NetworkStream inputStream = client.GetStream())
            using (BinaryReader reader = new BinaryReader(inputStream))
            {
                string filename = reader.ReadString();
                long lenght = reader.ReadInt64();

                using (FileStream outputStream = File.Open(filename, FileMode.Create))
                {
                    long totalBytes = 0;
                    int readBytes = 0;
                    byte[] buffer = new byte[2048];

                    do
                    {
                        readBytes = inputStream.Read(buffer, 0, buffer.Length);
                        outputStream.Write(buffer, 0, readBytes);
                        totalBytes += readBytes;

                        backgroundWorker1.ReportProgress(
                            (int)Math.Round(Convert.ToDouble(totalBytes) / Convert.ToDouble(lenght) * 100));

                        if (backgroundWorker1.CancellationPending)
                        {
                            e.Cancel = true;
                            break;
                        }

                    } while (client.Connected && totalBytes < lenght);
                }
            }

            client.Close();
            listener.Stop();
        }

        private void backgroundWorker1_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            pictureBox1.ImageLocation = "test.jpg";

            backgroundWorker1.RunWorkerAsync();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
