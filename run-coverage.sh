#!/bin/bash

# Run tests with code coverage
npm run test:coverage

# Check if tests passed
if [ $? -eq 0 ]; then
    echo "Tests passed! Opening coverage report..."
    
    # Open the coverage report
    npm run coverage:report
    
    echo "Coverage report opened in your browser."
else
    echo "Tests failed. Please fix the failing tests before viewing the coverage report."
    exit 1
fi 