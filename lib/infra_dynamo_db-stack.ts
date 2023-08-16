import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb'
import * as lambda from 'aws-cdk-lib/aws-lambda'
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as ec2 from 'aws-cdk-lib/aws-ec2'
import { readFileSync } from 'fs';
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
    
    //EC2 Instance
    const demoEC2 = new ec2.Instance(this, 'demoEC2LogicalID', {
      vpc: demoVPC,
      vpcSubnets: {subnetType: ec2.SubnetType.PUBLIC},
      securityGroup: demoSG,
      instanceType: ec2.InstanceType.of(ec2.InstanceClass.T2, ec2.InstanceSize.MICRO),
      machineImage: ec2.MachineImage.latestAmazonLinux2({
        generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
      })
      keyName: 'demo_udemy',})
      
      //userData
      const userData = readFileSync('./lib/userdata.sh', 'utf8');
        demoEC2.addUserData(userData);

  }
}
