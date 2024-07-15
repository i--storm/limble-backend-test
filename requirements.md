# Project Instructions
At Limble, we want to track various costs for our customers, and one of those is labor cost. In our test problem, the labor cost is fairly simple: it’s the total of all the time worked by the workers, multiplied by their hourly wage. A worker can log time on a task several times, and many workers can work on the same task. This is captured by rows in the logged_time table.

## Changes Needed:

### JSON Objects for Pie Graphs

We want to be able to make this information available to the frontend application for pie graphs via an HTTP server. The pie graphs can slice in two different ways:
- __By worker:__ the total cost of that worker across all tasks and locations
- __By location:__ the total labor cost for tasks tied to a given location
Create some endpoints in the dummy server included in the repo that will give back these results in JSON format.

### Completion Status

Tasks can be either complete or incomplete. When we do our API calls for the pie graphs, the client should be able to specify if they want to include completed tasks, incomplete tasks, or both.
For example: if we’re doing average costs for tasks, incomplete tasks will throw off the average because they don’t give an idea of what the final cost will be.

### Filtering

We should allow filtering on sets of worker IDs and/or location ID for both endpoints.

Repo:

https://github.com/LimbleCMMS/backend-test

Make whatever changes you need to get the repo in a good place for demo. We don’t expect production code, but we’d like to see how far you get in the time you can commit to this. Once you have completed the project, please send us a link to your code or zip, and we will schedule a final interview to review your project and discuss your solution. In the meantime, our Recruiting team will follow up with a separate email containing additional information on processing payment for your time spent completing the project.
Please let us know if you have any questions, and we look forward to reviewing your project!