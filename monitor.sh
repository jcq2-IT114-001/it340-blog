#!/bin/bash

# Log file location
LOGFILE="/var/log/backend_monitor.log"

# Log the time and IP of each request to the backend
echo "$(date) - Monitoring backend..." >> $LOGFILE
ssh vm2 "tail -n 50 /path/to/backend/logs" >> $LOGFILE
