
import codecs
import json
import re

with codecs.open('data.js', 'r', 'utf-8') as f:
    content = f.read()

se_module = """
  ,{
    moduleId: 5,
    title: "Module 5: SE Career Portfolio Guidance",
    icon: "🚀",
    topics: [
      {
        topicId: 501,
        title: "The SE Mindset Shift",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">From Builder to Trusted Advisor</h3>
            <p>A Software Engineer builds what they are told to build. A Solutions Engineer (SE) figures out what <em>should</em> be built to solve a business problem.</p>
            <p>Your goal is no longer just writing code. Your goal is <strong>Technical Translation</strong> — taking a complex product and explaining how it solves a CEO's top-line revenue problem, or a CTO's risk mitigation problem.</p>
            
            <h3 class="lesson-h3">The Portfolio You Need</h3>
            <p>To transition into an SE role, you need a portfolio that proves you can do both:</p>
            <ul>
              <li><strong>The Technical Chops:</strong> A working, deployed application (e.g., this exact study app).</li>
              <li><strong>The Business Acumen:</strong> Architecture diagrams, cost analysis, and "pitch" documents explaining <em>why</em> you built it this way.</li>
            </ul>
          </div>
        `
      },
      {
        topicId: 502,
        title: "Building the 'Hero' Project",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">What makes a good SE Portfolio Project?</h3>
            <p>A calculator app in React doesn't cut it. You need a project that demonstrates you understand <strong>systems</strong>.</p>
            <ul>
              <li><strong>Use a cloud provider:</strong> Host it on AWS. Use S3 for static assets, CloudFront for CDN, and Lambda for a backend API.</li>
              <li><strong>Implement Auth:</strong> Use Cognito or Auth0. Security is paramount in B2B sales.</li>
              <li><strong>Write a 'One-Pager':</strong> Create a PDF that pitches your project as if it were a B2B SaaS product. What is the value proposition? Who is the target buyer?</li>
            </ul>
            <div class="lesson-alert">
              <strong>Action Item:</strong> Document your current "SalesTrainer" app. Draw an architecture diagram using Draw.io or Excalidraw showing how it runs on AWS. This is exactly what SEs do in discovery calls.
            </div>
          </div>
        `
      },
      {
        topicId: 503,
        title: "The SE Interview: The 'Demo' Round",
        content: `
          <div class="lesson-prose">
            <h3 class="lesson-h3">The Final Boss</h3>
            <p>The most important part of an SE interview is the mock demo. They will ask you to present a product (sometimes theirs, sometimes one of your choosing) to a "customer" (the interview panel).</p>
            <h3 class="lesson-h3">How to win:</h3>
            <ul>
              <li><strong>Discovery First:</strong> Never start by just showing features. Ask questions first. "Before I show you how our VPC setup works, can you tell me about your current compliance requirements?"</li>
              <li><strong>Tell-Show-Tell:</strong> <em>Tell</em> them what you're going to show them. <em>Show</em> them the feature. <em>Tell</em> them how it solved their specific problem.</li>
              <li><strong>Handle Objections Gracefully:</strong> They will purposefully interrupt you. "Is this secure?" Don't get defensive. Pause, validate ("Great question, security is our top priority..."), and pivot to your security slide.</li>
            </ul>
          </div>
        `
      }
    ]
  }
"""

# Find where the course array ends
start_course = content.find('course: [')
if start_course != -1:
    # Find the matching closing bracket for course array
    # Since it's at the end of the DATA object, let's just find the last ] before }
    end_course = content.rfind(']', start_course, content.rfind('}'))
    
    if end_course != -1:
        new_content = content[:end_course] + se_module + '\n' + content[end_course:]
        with codecs.open('data.js', 'w', 'utf-8') as f:
            f.write(new_content)
        print("Successfully added SE Career Portfolio Guidance module to course!")
    else:
        print("Could not find end of course array.")
else:
    print("Could not find course array.")
