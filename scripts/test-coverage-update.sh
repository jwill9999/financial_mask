#!/bin/bash

# Extract coverage statistics from the HTML report
STATEMENTS_PCT=$(grep -oP '(?<=Statements</span>.*<span class="strong">)[0-9.]+(?= %</span>)' coverage/angular-app/index.html)
STATEMENTS_FRAC=$(grep -oP '(?<=Statements</span>.*<span class="quiet">)[0-9]+/[0-9]+(?=</span>)' coverage/angular-app/index.html)
BRANCHES_PCT=$(grep -oP '(?<=Branches</span>.*<span class="strong">)[0-9.]+(?= %</span>)' coverage/angular-app/index.html)
BRANCHES_FRAC=$(grep -oP '(?<=Branches</span>.*<span class="quiet">)[0-9]+/[0-9]+(?=</span>)' coverage/angular-app/index.html)
FUNCTIONS_PCT=$(grep -oP '(?<=Functions</span>.*<span class="strong">)[0-9.]+(?= %</span>)' coverage/angular-app/index.html)
FUNCTIONS_FRAC=$(grep -oP '(?<=Functions</span>.*<span class="quiet">)[0-9]+/[0-9]+(?=</span>)' coverage/angular-app/index.html)
LINES_PCT=$(grep -oP '(?<=Lines</span>.*<span class="strong">)[0-9.]+(?= %</span>)' coverage/angular-app/index.html)
LINES_FRAC=$(grep -oP '(?<=Lines</span>.*<span class="quiet">)[0-9]+/[0-9]+(?=</span>)' coverage/angular-app/index.html)

# Format the statistics
STATEMENTS="${STATEMENTS_PCT}% (${STATEMENTS_FRAC})"
BRANCHES="${BRANCHES_PCT}% (${BRANCHES_FRAC})"
FUNCTIONS="${FUNCTIONS_PCT}% (${FUNCTIONS_FRAC})"
LINES="${LINES_PCT}% (${LINES_FRAC})"

echo "Current working directory: $(pwd)"
echo "Updating README.md with new coverage statistics..."

# Create a backup of the README
cp README.md README.md.bak

# Update the coverage statistics using awk
awk -v stats="$STATEMENTS" -v branches="$BRANCHES" -v funcs="$FUNCTIONS" -v lines="$LINES" '
{
    if ($0 ~ /^- Statements:/) 
        print "- Statements: " stats
    else if ($0 ~ /^- Branches:/)
        print "- Branches: " branches
    else if ($0 ~ /^- Functions:/)
        print "- Functions: " funcs
    else if ($0 ~ /^- Lines:/)
        print "- Lines: " lines
    else
        print $0
}' README.md > README.md.new

mv README.md.new README.md

echo "Verifying updates..."
grep -A 4 "current coverage exceeds" README.md

if grep -q "$STATEMENTS" README.md; then
    echo "Update successful!"
    rm README.md.bak
else
    echo "Update failed. Restoring backup..."
    mv README.md.bak README.md
fi 