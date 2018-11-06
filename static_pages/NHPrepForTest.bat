@echo off
REM Change nh/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running NHPrepforTest

call ReplaceURL.bat nh http[s]*:\/\/www.ezpassnh.com http:\/\/qa.ezpassnh.com
call ReplaceURL.bat maintenance_nh http[s]*:\/\/www.ezpassnh.com http:\/\/qa.ezpassnh.com

pause



