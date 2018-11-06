@echo off
REM Change mdta/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running mdtaPrepforLocal

call ReplaceURL.bat mdta http[s]*:\/\/www.ezpassmd.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat mdta http[s]*:\/\/www.ezpassmd.com http:\/\/localhost\/mdta

call ReplaceURL.bat maintenance_mdta http[s]*:\/\/www.ezpassmd.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_mdta http[s]*:\/\/www.ezpassmd.com http:\/\/localhost\/mdta

pause



