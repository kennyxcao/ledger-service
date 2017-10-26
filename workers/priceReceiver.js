const AWS = require('aws-sdk');
const { PriceQueueURL } = require('../config.js');

AWS.config.loadFromPath('../config.json');
const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

const params = {
  AttributeNames: [
    'All'
  ],
  MaxNumberOfMessages: 1,
  MessageAttributeNames: [
    'All'
  ],
  QueueUrl: PriceQueueURL,
  VisibilityTimeout: 120,
  WaitTimeSeconds: 20
};

sqs.receiveMessage(params, (err, data) => {
  if (err) {
    console.error('Receive Error', err);
  } else {
    console.log(data);
    console.log(data.Messages[0].Attributes);
    console.log(data.Messages[0].MessageAttributes);


    // if (data.Messages) {
    //   const deleteParams = {
    //     QueueUrl: PriceQueueURL,
    //     ReceiptHandle: data.Messages[0].ReceiptHandle
    //   };
    //   sqs.deleteMessage(deleteParams, (err, data) => {
    //     if (err) {
    //       console.error('Delete Error', err);
    //     } else {
    //       console.log('Message Deleted', data);
    //     }
    //   });
    // }
  }
});
