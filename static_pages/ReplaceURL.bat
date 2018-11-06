@echo off
REM %1 = start directory (required)  %2 = find text  %3 = new text
REM     Pass in the directory where you want to search for files to do the replacement.

if {%1}=={} (
	echo Command line parameters:  StartingDirectory
	goto :EOF
)

REM REMEMBER:   To search for http:// use http:\/\/

Title Converting URLs
Attrib -R %~f1\*.* /s

set tFindText=%2
set tNewText=%3

echo =====
echo Searching directory: %~f1 ...

REM     Loop through all files of specified type in all subdirectories of the passed in directory.
REM     For each file, call the FINDANDREPLACE routine.

echo      Replacing text: %tFindText% *with* %tNewText%
for /r %1 %%I in (*.html) do call :FINDANDREPLACE %%I %tFindText% %tNewText%
for /r %1 %%I in (*.shtml) do call :FINDANDREPLACE %%I %tFindText% %tNewText%
REM for /r %1 %%I in (*.js) do call :FINDANDREPLACE %%I %tFindText% %tNewText%
REM for /r %1 %%I in (*.xml) do call :FINDANDREPLACE %%I %tFindText% %tNewText%

echo DONE

REM     Delete the temporary environment variables.
set tFindText=
set tNewText=

goto :EOF

REM Use the UNIX port of sed to search and replace.
REM You must put the result into a new file, delete the original file, 
REM then rename the new file to the original name.
REM     Inputs:
REM             %1 - file to work with
REM             %2 - text to search for
REM             %3 - new replacement text

:FINDANDREPLACE
REM echo %1
sed s/%2/%3/ %1 > %1.out
del %1
ren %1.out %~n1%~x1
goto :EOF
