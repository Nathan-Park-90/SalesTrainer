const fs = require('fs');

let rawData = fs.readFileSync('data.js', 'utf8');
rawData = rawData.replace('const DATA =', 'var DATA=');
eval(rawData);

// Tag all topics
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        topic.tags = [];
        const tLower = topic.title.toLowerCase();
        
        // Foundations
        if (tLower.includes('server') || tLower.includes('bare metal') || tLower.includes('container') || tLower.includes('virtual machine')) topic.tags.push('compute', 'virtualization');
        if (tLower.includes('region') || tLower.includes('availability zone') || tLower.includes('physical cloud')) topic.tags.push('regions', 'ha');
        if (tLower.includes('capex') || tLower.includes('opex') || tLower.includes('financial')) topic.tags.push('sales', 'capex', 'opex');
        if (tLower.includes('scaling') || tLower.includes('auto scaling') || tLower.includes('asg')) topic.tags.push('compute', 'scaling', 'asg', 'ha');
        if (tLower.includes('load balancer') || tLower.includes('alb')) topic.tags.push('networking', 'load balancer', 'alb', 'ha');
        
        // AWS Core
        if (tLower.includes('vpc') || tLower.includes('subnet') || tLower.includes('peering') || tLower.includes('gateway') || tLower.includes('route 53') || tLower.includes('cloudfront')) topic.tags.push('networking');
        if (tLower.includes('ec2') || tLower.includes('lambda') || tLower.includes('ecs') || tLower.includes('eks') || tLower.includes('fargate') || tLower.includes('batch')) topic.tags.push('compute');
        if (tLower.includes('s3') || tLower.includes('ebs') || tLower.includes('storage')) topic.tags.push('storage');
        if (tLower.includes('rds') || tLower.includes('dynamodb') || tLower.includes('database')) topic.tags.push('database');
        if (tLower.includes('iam') || tLower.includes('security') || tLower.includes('kms') || tLower.includes('waf') || tLower.includes('shield') || tLower.includes('zero trust')) topic.tags.push('security');
        if (tLower.includes('sales') || tLower.includes('pitching') || tLower.includes('demo') || tLower.includes('cto') || tLower.includes('gong')) topic.tags.push('sales');
        if (tLower.includes('career') || tLower.includes('portfolio') || tLower.includes('interview')) topic.tags.push('career');
        
        // Direct Keywords
        if (tLower.includes('vpc')) topic.tags.push('vpc');
        if (tLower.includes('ec2')) topic.tags.push('ec2');
        if (tLower.includes('s3')) topic.tags.push('s3');
        if (tLower.includes('rds')) topic.tags.push('rds');
        if (tLower.includes('lambda')) topic.tags.push('lambda');
        if (tLower.includes('dynamodb')) topic.tags.push('dynamodb');
        
        // Fallback
        if (topic.tags.length === 0) topic.tags.push('aws_core');
    });
});

const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('Topics meticulously tagged!');
