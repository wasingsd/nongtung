@echo off
node extract_images.js > extract.log 2>&1
dir public\images\*.png >> extract.log
type extract.log
