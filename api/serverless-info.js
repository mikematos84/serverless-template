'use strict';

const child = require('child_process');
const path = require('path');
const fs = require('fs');
const YAML = require('yaml');
const argv = require('yargs').argv;

class ServerlessInfo {
  constructor(props = {}) {
    this.config = {};
    this.stage = argv.stage || 'dev';
    this.service = '';
    this.data = {};
  }

  async Load() {
    let contents = await fs.readFileSync(path.resolve(__dirname, '../serverless.yml'), 'utf8');
    this.config = YAML.parse(contents);

    this.service = `${this.config.service}-${this.stage}`;

    let describeStacks = await this.DescribeStacks(this.service);
    this.data.describeStacks = JSON.parse(describeStacks);

    let listStackResources = await this.ListStackResources(this.service);
    this.data.listStackResources = JSON.parse(listStackResources)

    return Promise.resolve(this);
  }

  async asyncExec(command, options = {}) {
    return new Promise((resolve, reject) => {
      child.exec(command, (err, stdout, stderr) => {
        if (err) {
          reject(stderr);
          return;
        }

        resolve(stdout);
      })
    })
  }

  async DescribeStacks(stackName, query = null) {
    stackName = stackName ? `--stack-name ${stackName}` : '';
    query = query ? `--query ${query}` : '';
    return this.asyncExec(`aws cloudformation describe-stacks ${stackName} ${query}`)
  }

  async ListStackResources(stackName, query = null) {
    stackName = stackName ? `--stack-name ${stackName}` : '';
    query = query ? `--query ${query}` : '';
    return this.asyncExec(`aws cloudformation list-stack-resources ${stackName} ${query}`)
  }

  get Stack() { return this.data.describeStacks.Stacks[0]; }
  get StackName() { return this.Stack.StackName; }
  get ServiceEndpoint() { return this.Stack.Outputs.find(x => x.OutputKey === 'ServiceEndpoint').OutputValue; }

  get Resource() { return this.data.listStackResources.StackResourceSummaries; }
  get S3Buckets() { return this.Resource.filter(x => x.LogicalResourceId === 'S3Bucket'); }
  S3Bucket(physicalResourceId) { return this.S3Buckets.find(x => x.PhysicalResourceId.includes(physicalResourceId)); }
  get DynamoTables() { return this.Resource.filter(x => x.LogicalResourceId === 'DynamoDBTable'); }
  DynamoTable(physicalResourceId) { return this.DynamoTables.find(x => x.PhysicalResourceId.includes(physicalResourceId)); }
}

module.exports = ServerlessInfo;