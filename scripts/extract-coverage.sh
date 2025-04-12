#!/bin/bash

# Extract overall coverage percentage from coverage report using awk
COVERAGE=$(awk '/All files/ {print $4}' coverage/angular-app/index.html | head -n 1)

# Determine color based on coverage percentage
if (( $(echo "$COVERAGE >= 80" | bc -l) )); then
    COLOR="brightgreen"
elif (( $(echo "$COVERAGE >= 60" | bc -l) )); then
    COLOR="yellow"
else
    COLOR="red"
fi

# Output the coverage percentage and color
echo "coverage=$COVERAGE" >> $GITHUB_OUTPUT
echo "color=$COLOR" >> $GITHUB_OUTPUT 