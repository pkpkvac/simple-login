import aws from "aws-sdk";
// require("dotenv").config(); // Configure dotenv to load in the .env file
// Configure aws with your accessKeyId and your secretAccessKey
aws.config.update({
  region: "ca-central-1", // Put your aws region here
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});
// https://vercel.com/docs/environment-variables

const S3_BUCKET = process.env.bucket;
// Now lets export this function so we can call it from somewhere else

export default (req, res) => {
  if (req.method === "POST") {
    const s3 = new aws.S3(); // Create a new instance of S3
    const fileName = req.body.fileName;
    const fileType = req.body.fileType;
    const weddingID = req.body.weddingID;

    // Set up the payload of what we are sending to the S3 api
    const s3Params = {
      Bucket: `${S3_BUCKET}/${weddingID}`,
      Key: fileName,
      Expires: 50,
      ContentType: fileType,
      ACL: "public-read",
    };
    // Make a request to the S3 API to get a signed URL which we can use to upload our file
    s3.getSignedUrl("putObject", s3Params, (err, data) => {
      if (err) {
        res.json({ success: false, error: err });
      }
      console.log(data);

      // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved.

      //TODO: Figure out the hell to do with this
      const returnData = {
        signedRequest: data,
        url: `https:/${S3_BUCKET}.s3.amazonaws.com/${fileName}`,
      };

      res.json({ success: true, data: { returnData } });
    });
  }
};
