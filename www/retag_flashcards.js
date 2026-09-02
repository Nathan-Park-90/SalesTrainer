const fs = require('fs');

let rawData = fs.readFileSync('data.js', 'utf8');
rawData = rawData.replace('const DATA =', 'var DATA=');
eval(rawData);

DATA.flashcards.forEach(card => {
    card.tags = [];
    const txt = (card.front + ' ' + card.back).toLowerCase();
    
    // Networking
    if (txt.match(/\b(vpc|subnet|nacl|security group|route 53|cloudfront|peering|transit gateway|api gateway|alb|nlb|load balancer)\b/)) {
        card.tags.push('networking');
        if (txt.includes('vpc')) card.tags.push('vpc');
    }
    
    // Compute
    if (txt.match(/\b(ec2|lambda|ecs|eks|fargate|serverless|compute|batch|elastic beanstalk)\b/)) {
        card.tags.push('compute');
        if (txt.includes('ec2')) card.tags.push('ec2');
        if (txt.includes('lambda')) card.tags.push('lambda');
    }
    
    // Storage
    if (txt.match(/\b(s3|ebs|efs|storage|glacier|fsx)\b/)) {
        card.tags.push('storage');
        if (txt.includes('s3')) card.tags.push('s3');
    }
    
    // Database
    if (txt.match(/\b(rds|dynamodb|aurora|database|redshift|elasticache)\b/)) {
        card.tags.push('database');
        if (txt.match(/\b(rds|aurora)\b/)) card.tags.push('rds');
        if (txt.includes('dynamodb')) card.tags.push('dynamodb');
    }
    
    // Security
    if (txt.match(/\b(iam|kms|waf|shield|macie|encryption|cognito|organizations|scp|guardduty)\b/)) {
        card.tags.push('security');
    }
    
    // Management & DR
    if (txt.match(/\b(cloudwatch|cloudtrail|config|disaster recovery|rto|rpo|snowball|datasync|backup)\b/)) {
        card.tags.push('management', 'dr');
    }
    
    if (card.cat === 'Sales') {
        card.tags.push('sales');
        if (txt.match(/\b(discovery|demo|portfolio|interview|hero project)\b/)) {
            card.tags.push('career');
        }
    }
});

// Any card with NO tags gets a fallback
DATA.flashcards.forEach(card => {
    if (card.tags.length === 0) {
        if (card.cat === 'AWS') card.tags.push('aws_core');
        if (card.cat === 'Sales') card.tags.push('sales');
    }
});

// Also add fallback to topics so they pull the generic aws_core if needed
DATA.course.forEach(mod => {
    mod.topics.forEach(topic => {
        if (!topic.tags) topic.tags = [];
        if (topic.tags.length === 0) {
            topic.tags.push(mod.title.toLowerCase().includes('sales') ? 'sales' : 'aws_core');
        }
    });
});

const serialized = 'const DATA = ' + JSON.stringify(DATA, null, 4) + ';';
fs.writeFileSync('data.js', serialized, 'utf8');

console.log('Flashcards aggressively retagged.');
