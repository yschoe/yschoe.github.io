#!/usr/bin/perl

# Fetch representative image from URL
# - work in progress.
# - pretty rudimentary.

$url = $ARGV[0];

open(FP, "lynx -source $url|");

while (<FP>) {

  if (/\<img.*src=\"([^\"]+)\"/) {

    print "IMG: $1\n";

  }

}

close(FP);

