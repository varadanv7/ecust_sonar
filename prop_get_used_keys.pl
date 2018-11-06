#!/usr/bin/perl
# prop_get_used_keys.pl
# Get sorted list of keys (from key to eol) used by java/jsp files
# to allow removal of unused keys or listing of properties.

use strict;
use File::Find;

my ($pattern, $prev_file, $out_file, $delim);

#$pattern = shift(@ARGV);
#$pattern = "\"([a-zA-Z0-9\.\-]*)@\"";
#$pattern = "([a-zA-Z0-9\.\-]*)";

#if ($pattern eq "") {
#   print "Usage:\nPut prop_get_used_keylist.pl at root of the directory to be searched.\n";
#	print "Then enter:\n\tperl prop_get_used_keys.pl <pattern> [<outfile>]\n";
#   exit;
#}

#$out_file = shift(@ARGV);
#if ($out_file eq "") {
#	$out_file = "_used_keys_${pattern}.txt";
	$out_file = "_used_keys_.txt";
#}

#print "prop_get_used_keywords\nsearch string: $pattern\n\n";

$delim = "|";
$prev_file = "";

open (OUT, ">>$out_file");
print OUT "MATCH${delim}CONTEXT${delim}FILE${delim}LINE#${delim}LINE\n";

# Add next back conditional on nonexistence
#print OUT "KEY${delim}BUNDLE${delim}SOURCE FILE${delim}LINE#${delim}LINE\n";

find(\&wanted, '.');
close OUT;
exit;

sub wanted {
	my ($current_file, $line, $line_num, $head, $tail, $context, $rest, $match);

	if ($_ !~ /.jsp$|.java$/) {
		next;
	}
	$current_file = $File::Find::name;
#	print $current_file,"\n";
	print ".";
	open (IN, $_) or die "Cannot open $_: $!\n";

	while (<IN>) {
		chomp;
		s/^\s+//;
		s/\s+$//;
		s/\t+/' '/g;

#		($head, $tail) = split $pattern, $_, 2;
		$line = $_;
#		($head, $match, $tail) = $line =~ /(.*?)$pattern(.*)/;
#		($head, $match, $tail) = $line =~ /(.*?)([a-z]*)(.*)/;
#		($head, $tail) = $line =~ /(.*?)err(.*)/;
		$head = '';
		$match = '';
		$tail = '';

		if (/final\s+String/) {
#			print $line,"\n";
			($head,$match,$tail) = $line =~ /(.*?final\s+String.*?=\s+\")([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-\.]*)(.*)/;
		} elsif (/<%=\"/) {
			($head,$match,$tail) = $line =~ /(.*?<%=\")([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-\.]*)(.*)/;
		} elsif (/bean:message key=\"/) {
			($head,$match,$tail) = $line =~ /(.*?bean:message key=\")([a-zA-Z0-9_\-]*\.[a-zA-Z0-9_\-\.]*)(.*)/;
		}

		if ($match =~ /\.html|\.shtml|\.jrxml|^\./) {
			next;
		}

		if ($head ne "") {
#		print "line: $line\nhead: $head\nmatch: $match\ntail: $tail\n\n";
		}

		if ($current_file ne $prev_file) {
			$prev_file = $current_file;
			$line_num = 0;
		}
		$line_num++;
		if ($tail ne "") {
			# get property file context
			$context = $tail;
			if ($tail =~ /accountmaintenance/io) {
				$context = "AccountMaintenance";
			} elsif ($tail =~ /accountsignup/io) {
				$context = "AccountSignUp";
			} elsif ($tail =~ /applicationresources|appresource/io) {
				$context = "AppResource";
			} elsif ($tail =~ /retailers/io) {
				$context = "Retailers";
			} elsif ($tail =~ /violations/io) {
				$context = "Violations";
			} elsif ($tail =~ /invoices/io) {
				$context = "Invoices";
			}

			# get rest of key
#			($rest) = $tail =~ /^([a-z0-9\.-]*).*/io;

#			print OUT "$pattern$rest${delim}$context${delim}$current_file${delim}$line_num${delim}$head$pattern$tail\n";
			print OUT "$match${delim}$context${delim}$current_file${delim}$line_num${delim}$line\n";
		}
	}
}