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
using System.Threading;
using System.Windows.Forms;

namespace StreamServer
{
    public partial class Form1 : Form
    {
        Bitmap bt; Graphics screenShot;
        public string Hostname;
        public string Filename;
        bool stream = true;

        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            stream = true;
            doStream();
        }

        private static ImageCodecInfo GetEncoderInfo(String mimeType)
        {
            var encoders = ImageCodecInfo.GetImageEncoders();
            return encoders.FirstOrDefault(t => t.MimeType == mimeType);
        }

        private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
        {
            try
            {
                TcpClient client = new TcpClient(textBox1.Text, 20000);

                using (FileStream inputStream = File.OpenRead("test.jpg"))
                using (NetworkStream outputStream = client.GetStream())
                using (BinaryWriter writer = new BinaryWriter(outputStream))
                {
                    long lenght = inputStream.Length;
                    long totalBytes = 0;
                    int readBytes = 0;
                    byte[] buffer = new byte[4194304];


                    writer.Write(Path.GetFileName("test.jpg"));
                    writer.Write(lenght);

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

                client.Close();
                pictureBox1.ImageLocation = "test.jpg";
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
                stream = false;
            }
        }

        private void backgroundWorker1_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
        {
            Thread.Sleep(10);
            if (stream)
                doStream();
        }

        public void doStream()
        {
            bt = new Bitmap(Screen.PrimaryScreen.Bounds.Width, Screen.PrimaryScreen.Bounds.Height, PixelFormat.Format32bppArgb);
            screenShot = Graphics.FromImage(bt);
            screenShot.CopyFromScreen(Screen.PrimaryScreen.Bounds.X, Screen.PrimaryScreen.Bounds.Y, 0, 0, Screen.PrimaryScreen.Bounds.Size, CopyPixelOperation.SourceCopy);
            System.Drawing.Imaging.Encoder myEncoder = System.Drawing.Imaging.Encoder.Quality;
            EncoderParameters myEncoderParameters = new EncoderParameters(1);
            var ici = GetEncoderInfo("image/jpeg");

            Size size = new Size(640, 360);
            Bitmap printscreen = new Bitmap(bt, size);

            Graphics g = Graphics.FromImage(printscreen);
            EncoderParameter myEncoderParameter = new EncoderParameter(myEncoder, Convert.ToInt64(trackBar1.Value));
            myEncoderParameters.Param[0] = myEncoderParameter;
            printscreen.Save("test.jpg", ici, myEncoderParameters);

            backgroundWorker1.RunWorkerAsync();
        }

        private void button2_Click(object sender, EventArgs e)
        {
            stream = false;
        }
    }
}
