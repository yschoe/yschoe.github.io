#!/usr/bin/perl

$query = $ARGV[0];


$query =~ s/[^a-zA-Z]/\ /g;
$query =~ s/[\s]+/\ /g;
$title =  $query;
$title_escaped = ($title =~ s/\ /\\\ /g);
$query =~ s/\ /\+/g;

print "- title: $query\n";

$url = "https://catalog.library.tamu.edu/Search/Results?lookfor=$query&type=AllFields";

#print "URL = $url\n";

open(FP,"lynx -source \"$url\" |");

while(<FP>) {

  if (/\s+by\s+<a[^>]*>([^<]+)</){
    print "  author: \"$1\"\n";
  }

  if (/\s+<br\ \/>\s+Published\s+([0-9][0-9][0-9][0-9])\s+</) {
    print "  year: $1\n";
    exit;
  }

}  

close(FP);

