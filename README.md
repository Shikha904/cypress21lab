# 21-mobile-e2e-tests

All things end to end test related for 21Labs milestone repositories.

Requirements for running:

- PostgreSQL 11
- Be logged into saml2aws
- environment_variables.sh for service with database connection parameters
- environment_variables_w.sh for worker
- Git large file storage installed and setup prior to cloning

To run locally:

1. Clone the 21-mobile-e2e-tests repository

   git clone https://github.com/20one/21-mobile-e2e-tests.git

   cd ./21-mobile-e2e-tests

   git checkout -B "branch" "origin/branch"

2. Install dependencies

   npm install

3. Run test in Git Bash

   ./run branch-to-run-against
