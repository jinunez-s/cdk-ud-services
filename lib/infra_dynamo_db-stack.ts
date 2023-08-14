import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path = require ('path')
export class InfraDynamoDbStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraDynamoDbQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    //DynamoDB table
    const dynamoDB = new dynamodb.Table(this, "dynamoDBLogicalID", {
      readCapacity: 3,
      writeCapacity: 3,
      partitionKey: {name: 'customerID', type: dynamodb.AttributeType.NUMBER},
      tableName: "demoTable2"
    })

    //Lambda //Code-Handle-Runtime
    const demoLambda = new lambda.Function(this, "demoLambdaLogicalID", {
      handler: "lambda_function.handler",
      runtime: lambda.Runtime.NODEJS_18_X,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../services/')),
      functionName: "handler"
    })

    //Lambda Type NodeJSFunction
    // const demoLambdaTwo = new NodejsFunction(this, "demoLambdaNodeJs", {
    //   entry: path.join(__dirname, '../services/', 'lambda_function.mjs')
    // })

  }
}
