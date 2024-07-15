// Import the AWS SDK
import { config, S3 } from 'aws-sdk';

// Set credentials and region,
// which can also go directly on the service client
const aws_access_key_id = process.env.AWS_ACCESS_KEY_ID;
const aws_secret_access_key = process.env.AWS_SECRET_ACCESS_KEY;
console.log(aws_access_key_id);
console.log(aws_secret_access_key);

config.update({ accessKeyId: aws_access_key_id, secretAccessKey: aws_secret_access_key, region: 'ap-southeast-1' });

var s3 = new S3({ apiVersion: '2006-03-01' });

/**
 * This function retrieves a list of objects
 * in a bucket, then triggers the supplied callback
 * with the received error or data
 */
export default {
  listObjects(bucket, callback) {
    s3.listObjects({
      Bucket: bucket
    }, callback);
  }
}

