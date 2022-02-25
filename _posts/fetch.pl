#!/usr/bin/perl
# fetch arxiv paper data and print to stdout

$arxiv=$ARGV[0];
$comment=$ARGV[1];

if ($arxiv !~ /[0-9]+\.[0-9]+v[0-9]+/) {
  print "Error: $arxiv is not a valid ArXiV ID. Aborting.\n";
  exit;
}

$url = "https://arxiv.org/abs/$arxiv";

open(FP,"lynx -source $url |");
$file="";
while (<FP>){
  $file .= $_;
} 
close(FP);

# Date
$file =~ /<meta\ name\=\"citation_date\"\ content\=\"([^\"]+)\"\/>/;
$date = $1;
print "$date\n\n";


print "$comment \n\n";

# Title
$file =~ /<meta\ name\=\"citation_title\"\ content\=\"([^\"]+)\"\/>/;
$title= $1;
print "### $title\n\n";

# Authors
@authors = ($file =~ /<meta\ name\=\"citation_author\"\ content\=\"([^\"]+)\"\/>/g);

foreach $author (@authors) {
  print "* $author; \n";
}

# Abstract 
$file =~ /<meta\ name\=\"citation_abstract\"\ content\=\"([^\"]+)\"\/>/;
$abstract = $1;
$abstract =~ s/\n/\ /g;
print "\n\n**Abstract**: $abstract\n\n $url";

