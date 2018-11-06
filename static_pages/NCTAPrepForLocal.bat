@echo off
REM Change ncta/ to the directory used if different.
REM Place this in the static pages directory that is the parent of the site

echo Running nctaPrepforLocal

call ReplaceURL.bat ncta http[s]*:\/\/www.myncquickpass.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat ncta http[s]*:\/\/www.myncquickpass.com http:\/\/localhost\/ncta

call ReplaceURL.bat maintenance_ncta http[s]*:\/\/www.myncquickpass.com\/vector\/ http:\/\/localhost:9080\/vector\/
call ReplaceURL.bat maintenance_ncta http[s]*:\/\/www.myncquickpass.com http:\/\/localhost\/ncta

pause



