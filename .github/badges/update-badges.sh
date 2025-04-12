#!/bin/bash

# Create badges directory if it doesn't exist
mkdir -p .github/badges

# Extract coverage percentage
COVERAGE_PCT=$(grep -A 4 "Coverage summary" coverage/angular-app/index.html | grep "Statements" | grep -oP '[0-9.]+(?=%)')

# Create or update coverage.json
cat > .github/badges/coverage.json << EOF
{
  "schemaVersion": 1,
  "label": "coverage",
  "message": "${COVERAGE_PCT}%",
  "color": "brightgreen",
  "coverage": ${COVERAGE_PCT}
}
EOF

echo "Updated coverage badge with ${COVERAGE_PCT}%" 