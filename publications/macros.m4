m4_dnl macros.m4,v 1.12 2002/01/21 05:37:04 jbednar Exp
m4_dnl
m4_dnl Macros for creating web pages
m4_dnl
m4_dnl Example usage: "m4 -P -Dm4_image_scale=2 ring.m4 > ring.html"
m4_dnl where ring.m4 contains a line: m4_include(macros.m4)m4_dnl
m4_dnl
m4_dnl
m4_include(/home/yschoe/nn/nnmacros.m4)m4_dnl
m4_dnl
m4_dnl Suppress all output from this file so that we can use blank
m4_dnl lines freely between definitions
m4_divert(-1) 


m4_dnl Fancy separator
m4_dnl m4_define([[m4_horizontal_rule]], [[<P><IMG SRC="images/color-line.gif" WIDTH="800" HEIGHT="2"
m4_dnl ALT="==================================================================" >]])m4_dnl
m4_define([[m4_horizontal_rule]], [[<HR>]])m4_dnl


m4_dnl This would normally be done using style sheets, but Netscape 4
m4_dnl is very buggy in the background color handling
m4_define([[m4_highlight_color]], [[#d2d2c4]])
m4_dnl m4_define([[m4_highlight_color]], [[#edb]])


m4_dnl For use at the beginning of the web page
m4_dnl
m4_define([[m4_webpagestart]], [[m4_dnl
<HTML>m4_define([[m4_currentwebpage]], [[$1]])m4_dnl (Saves copy of title for use elsewhere)
<HEAD>
<META HTTP-EQUIV="content-type" CONTENT="text/html; charset=ISO-8859-1">
<LINK rel="stylesheet" type="text/css" media="screen" href="choe.css">
<TITLE>m4_ifelse(m4_eval($#>=2), [[0]], [[$1]], [[$2]])</TITLE>
m4_ifelse(m4_eval($#>=3), [[0]], [[]], [[<META  NAME="keywords" CONTENT="$3">]])[[]]m4_dnl
m4_ifelse(m4_eval($#>=4), [[0]], [[]], [[
<META  NAME="description" CONTENT="$4">]])[[]]m4_dnl
</HEAD>
m4_dnl <BODY BGCOLOR="#333366" TEXT="#FFFFFF" LINK="#DDDD00" VLINK="#22DD22" >
<BODY bgcolor="#ffffff" link="000077" vlink="#000000">
m4_ifelse($1, [[]], [[]], [[<CENTER><H1>$1</H1></CENTER>]])
]])


m4_define([[m4_jbednar_mail]],[[<A HREF="mailto:jbednar@cs.utexas.edu">jbednar@cs.utexas.edu</A>]])m4_dnl


m4_dnl Private routine for constructing page footers
m4_dnl
m4_define([[m4_webpageend_base]], [[
m4_define([[m4_page_dir]], [[m4_ifelse(m4_eval($2>=3), [[0]], [[]], [[m4_ifelse(m4_eval($2>=5), [[0]], [[../]], [[../../]])]])]])
<P class=pagefooter>
<TABLE class=linkbar WIDTH="100%"
  STYLE="margin-top: 0.5em; padding: 0.3em"><TR>
m4_dnl <TABLE class=linkbar WIDTH="100%"><TR>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]index.html">Home</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]contact.html">Contact</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]research.html">Research</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]demos.html">Demos</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]publications.html">Publications</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]software.html">Software</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]teaching.html">Teaching</A></TD>
  <TD ALIGN="CENTER" BORDER="0"><A HREF="m4_page_dir[[]]hotlist.html">Links</A></TD>
  </TR>
</TABLE>
<TABLE WIDTH="100%"><TR>
  <TD ALIGN="LEFT"><SMALL><I>m4_jbednar_mail</I><SMALL></TD>
  <TD ALIGN="RIGHT"><SMALL><I>Last update: $1</I><SMALL>m4_dnl
<img src="http://www.cs.utexas.edu/users/jbednar/cgi-bin/logaccess.cgi?jbednar-[[]]m4_translit(m4_currentwebpage,[[ ,()'?<>"/:[*]!]],[[_]])" height=1 width=1>
</TD>
  </TR>
</TABLE>
</P>
</BODY>
</HTML>]])m4_dnl


m4_dnl Version using UTCS's count script:
m4_dnl <TD ALIGN="RIGHT"><SMALL><I>Last update: $1</I><SMALL><img src="http://www.cs.utexas.edu/pub/cgi/Count.cgi?ft=1&dd=C&frgb=255;215;0|df=jbednar-[[]]m4_translit(m4_currentwebpage,[[ ,()'?<>"/:[*]!]],[[_]]).dat" height=1 width=1>


m4_dnl For use at the end of a web page at various levels
m4_dnl These take text for 'last update' info as argument
m4_dnl
m4_define([[m4_homewebpageend]],     [[m4_webpageend_base([[$1]],[[0]])]])m4_dnl
m4_define([[m4_webpageend]],         [[m4_webpageend_base([[$1]],[[1]])]])m4_dnl
m4_define([[m4_researchwebpageend]], [[m4_webpageend_base([[$1]],[[2]])]])m4_dnl
m4_define([[m4_privatewebpageend]],  [[m4_webpageend_base([[$1]],[[3]])]])m4_dnl
m4_define([[m4_employwebpageend]],   [[m4_webpageend_base([[$1]],[[4]])]])m4_dnl
m4_define([[m4_subsubwebpageend]],   [[m4_webpageend_base([[$1]],[[5]])]])m4_dnl



m4_define([[m4_photowebpageend]], [[
m4_ifelse(m4_eval($#>=2), [[0]], [[]], [[m4_dnl 
<P>All images copyright $2 James A. Bednar; all rights reserved.]])
m4_webpageend_base([[$1]],[[3]])]])m4_dnl



m4_dnl Figure key with the given items
m4_dnl
m4_define([[m4_figure_key]],[[m4_dnl
<TABLE ALIGN="RIGHT" CELLPADDING="10" WIDTH="m4_dnl
m4_ifelse(m4_eval($#>=2), [[0]], [[30%]], [[$2]])m4_dnl
%">
  <TR><TD>
    <TABLE ALIGN="LEFT" BORDER STYLE="padding: 0.3em">
      <SMALL><I>
      <TR><TH ALIGN="LEFT"><B>Key:</B></TH>
      <TR><TD><SMALL><I>
        <OL TYPE="a" ALIGN="CENTER">
m4_ork_items(m4_shift(m4_shift($@)))
        </OL></I></SMALL>
      </TD></TR>
      </I></SMALL>
m4_dnl
m4_dnl
m4_dnl   Add extra caption, if provided
m4_ifelse([[$#]],[[0]],[[]],[[m4_dnl
      <TR><TD WIDTH="30%"><SMALL><I>
        $1[[]]m4_dnl
      </I></SMALL></TD></TR>
]])m4_dnl
m4_dnl
m4_dnl
    </TABLE>
  </TD></TR>
</TABLE>
]])m4_dnl


m4_dnl   Private routine: one item in a figure key
m4_define([[m4_ork_item]],[[      	  <LI>$1]])m4_dnl

m4_dnl   Private routine: print all of the given figure key items in order
m4_define([[m4_ork_items]],  [[m4_ifelse($#, 1, [[m4_ork_item([[$1]])]], [[m4_ork_item([[$1]])
m4_ork_items(m4_shift($@))]])]])m4_dnl



m4_dnl Orientation animation key with standard subcaptions
m4_dnl 
m4_define([[m4_orientation_figure_key]],[[m4_dnl
m4_figure_key([[$1]],[[40]],
[[retinal image presented to map g.]],
[[initial response of the cortex to that image]],
[[orientation histogram of the initial response]],
[[settled response of the cortex to that image]],
[[orientation histogram of the settled response]],
[[key showing color assigned to each angle]],
[[self-organized RF-LISSOM orientation map]],
[[orientation histogram of the orientation map]]m4_dnl
)]])m4_dnl




m4_dnl This macro is provided as a convenience for any file which wishes to 
m4_dnl define arbitrary scaling of some of the images while allowing the
m4_dnl scaling value to be overridden on the command line.  By default
m4_dnl the scaling will not change the size.  
m4_dnl
m4_define([[m4_image_scale]], m4_ifdef([[m4_image_scale]], [[m4_image_scale]], [[1]]))m4_dnl



m4_dnl If the m4_image_scale macro is used, the following macro can be used to
m4_dnl indicate that there are two size scales expected to be available,
m4_dnl (with the smallest nominally scale 1).  These sizes then link to 
m4_dnl each other appropriately.  The macro takes the file's basename as 
m4_dnl an argument, and assumes scale 2 is <basename>.html and scale 1 
m4_dnl is <basename>_small.html. If a second argument of `t' is provided, 
m4_dnl states that the other image size also has a different file 
m4_dnl (download) size (which is not always true).
m4_dnl
m4_define([[m4_image_scale_other_version_note]], [[m4_dnl
m4_ifelse(m4_image_scale,[[1]],[[m4_dnl
A m4_ifelse($2,[[t]],[[slower-loading]],[[]]) version of this page with <A HREF="$1.html">larger pictures</A> is also available.m4_dnl
]], 
[[A m4_ifelse($2,[[t]],[[faster-loading]],[[]]) version of this page with <A HREF="$1_small.html">smaller pictures</A> is also available.m4_dnl
]])
]])


m4_dnl Provide a link to the appropriately sized version of the indicated file
m4_dnl Usage: m4_scaled_link(description,basename)
m4_dnl        m4_scaled_link_icon(description,basename,icon_basename,icon_width,icon_height)
m4_dnl
m4_define([[m4_image_selector]],[[m4_ifelse(m4_image_scale,[[1]],[[_small]],[[]])]])m4_dnl

m4_define([[m4_scaled_link]],[[<A HREF="$2[[]]m4_image_selector.html">$1</A>]])m4_dnl

m4_define([[m4_link_icon]],  [[<A HREF="$2.html">
<IMG ALIGN=CENTER WIDTH="$4"  HEIGHT="$5"  ALT="Icon"
SRC="m4_nn_imagedir/$3_icon.gif">
$1</A>]])

m4_define([[m4_scaled_link_icon]],  [[<A HREF="$2[[]]m4_ifelse(m4_image_scale,[[1]],[[_small]]).html">
<IMG ALIGN=CENTER WIDTH="$4"  HEIGHT="$5"  ALT="$2"
SRC="m4_nn_imagedir/$3_icon.gif">$1</A>]])


m4_dnl Common figure prefixes
m4_dnl
m4_define([[m4_or_image_base]],      [[981109_or_map_128MB.020010]])m4_dnl
m4_define([[m4_hugeor_image_base]],  [[981109_or_map_2048MB]])m4_dnl
m4_define([[m4_tae_image_base]],     [[981115_or_map_2048MB]])m4_dnl
m4_define([[m4_logo_image_base]],    [[000506_or_map_128MB]])m4_dnl

m4_dnl Standard figure for sweeping line
m4_dnl
m4_define([[m4_sweep_figure]], [[m4_dnl
<P><CENTER><TABLE ALIGN="center">
<TR>
  <TD>m4_scaled_local_image(m4_image_scale,images/m4_or_image_base.$1sweepanim.gif,Sweeping lines and $1 cortical response)</TD>
  <TD>m4_local_image(images/or_key_white_bordered[[]]m4_image_selector.gif,Orientation key)</TD>
  <TD>m4_scaled_local_image(m4_image_scale,images/m4_or_image_base.or.gif,Orientation map)</TD>
<TR>
  <TD>m4_image_caption(m4_image_scale,a,78,b,96,c,22,d,96,e,22)</TD>
  <TD>m4_image_caption(m4_image_scale,f,16)</TD>
  <TD>m4_image_caption(m4_image_scale,g,100,h,20)</TD>
</TR>
</TABLE></CENTER>m4_dnl
]])


m4_dnl Standard figure for spinning line
m4_dnl
m4_define([[m4_spin_figure]], [[m4_dnl
<P><CENTER><TABLE ALIGN="center">
<TR>
  <TD>m4_local_image(images/m4_hugeor_image_base.$1.spinanim[[]]m4_image_selector.gif,Spinning line and cortical response)</TD>
  <TD>m4_local_image(images/or_key_white_bordered[[]]m4_image_selector.gif,Orientation key)</TD>
  <TD>m4_local_image(images/m4_hugeor_image_base.$1.or[[]]m4_image_selector.gif,Orientation map)</TD>
<TR>
  <TD>m4_image_caption(m4_image_scale,a,100,b,96,c,29,d,96,e,29)</TD>
  <TD>m4_image_caption(m4_image_scale,f,16)</TD>
  <TD>m4_image_caption(m4_image_scale,g,100,h,29)</TD>
</TR>
</TABLE></CENTER>m4_dnl
]])


m4_dnl Common links
m4_dnl
m4_define([[m4_demolink_spin]], [[m4_dnl
m4_scaled_link_icon(Orientation Perception: After Self-Organization,spinning,m4_hugeor_image_base.020000.spinanim,134,39) (56KB)
]])m4_dnl
m4_define([[m4_demolink_spin_init]], [[m4_dnl
m4_scaled_link_icon(Orientation Perception: Before Self-Organization,spinning_init,m4_hugeor_image_base.000000.spinanim,134,39) (133KB)
]])m4_dnl
m4_define([[m4_demolink_line]], [[m4_dnl
m4_scaled_link_icon(Line Orientation Demo,sweeping,m4_or_image_base.sweepanim,119,38) (600KB)
]])m4_dnl
m4_define([[m4_demolink_ring]], [[m4_dnl
m4_scaled_link_icon(Ring Orientation Demo,ring,m4_or_image_base.ringanim,110,41) (360KB)
]])m4_dnl
m4_define([[m4_demolink_accumulate]], [[m4_dnl
m4_scaled_link_icon(Orientation Map Demo,accumulatesweep,m4_or_image_base.accumulatesweepanim,119,38) (1.2MB)
]])m4_dnl
m4_define([[m4_demolink_rflissom]], [[m4_dnl
m4_scaled_link_icon(Background on RF-LISSOM,rflissom,m4_logo_image_base.RF-LISSOM_small_transparent,294,45) (420KB)
]])m4_dnl
m4_define([[m4_demolink_tae]], [[m4_dnl
m4_scaled_link_icon(Tilt Aftereffect Demo,
tae-demo,m4_hugeor_image_base[[]]_inh.taeanim.080p0_ssh,49,39) (35KB)
]])m4_dnl



m4_define([[m4_scaled_demolink_icon]],  
[[<A HREF="$2[[]]m4_ifelse(m4_image_scale,[[1]],[[_small]]).html">
<IMG ALIGN=CENTER WIDTH="$4"  HEIGHT="$5"  ALT="Icon"
SRC="m4_nn_imagedir/$3_icon.gif"></A>
<BR><A HREF="$2[[]]m4_ifelse(m4_image_scale,[[1]],[[_small]]).html">$1</A>]])



m4_define([[m4_ordemo_linkbar]], [[m4_dnl
<P>
<TABLE class=linkbar WIDTH="100%" STYLE="margin-top: 1em; padding: 0.3em; clear: both"><TR>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(Orientation,spinning,m4_hugeor_image_base.020000.spinanim,134,39)<BR><SMALL>(56KB)</SMALL></TD>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(Initial,spinning_init,m4_hugeor_image_base.000000.spinanim,134,39)<BR><SMALL>(133KB)</SMALL></TD>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(Lines,sweeping,m4_or_image_base.sweepanim,119,38)<BR><SMALL>(600KB)</SMALL></TD>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(Full Map,accumulatesweep,m4_or_image_base.accumulatesweepanim,119,38)<BR><SMALL>(1.2MB)</SMALL></TD>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(Ring,ring,m4_or_image_base.ringanim,110,41)<BR><SMALL>(360KB)</SMALL></TD>
  <TD ALIGN="CENTER" BORDER="0">m4_scaled_demolink_icon(TAE,tae-demo,m4_hugeor_image_base[[]]_inh.taeanim.080p0_ssh,49,39)<BR><SMALL>(35KB)</SMALL></TD>
  </TR>
</TABLE>
]])


m4_dnl Links to indirect overview pages
m4_dnl
m4_define([[m4_demolink_taebackground]], [[m4_dnl
<A HREF="tae.html">
<IMG ALIGN="CENTER" WIDTH="38"  HEIGHT="39"  ALT="Icon"
  SRC="m4_nn_imagedir/tae-demo-icon.gif">
Tilt Aftereffect Overview</A> (30KB)
]])

m4_define([[m4_demolink_patgenbackground]], [[m4_dnl
<A HREF="pattern-generation.html">
<IMG ALIGN="CENTER" WIDTH="39"  HEIGHT="39"  ALT="Icon"
  SRC="m4_nn_imagedir/feller_science96_icon.gif">
Pattern Generation</A> (3KB)
]])


m4_dnl Display a JPEG photograph centered in the page
m4_dnl
m4_dnl Usage: m4_photo(basename,caption)
m4_dnl
m4_dnl Takes the base of the filename (without .jpg), and assumes
m4_dnl there are two versions, with and without _small.  The 
m4_dnl optional caption is displayed underneath if supplied.
m4_dnl
m4_define([[m4_photo]], [[<p><br><br><br><br>m4_dnl
<center>m4_local_image(photos/$1[[]]m4_image_selector.jpg,[[$1]],[[BORDER=2]])</center>m4_dnl
<br>m4_ifelse(m4_eval($#>=2), [[0]], [[]], [[
<center>$2</center>]])m4_dnl
]])m4_dnl


m4_dnl Display a JPEG thumbnail link to a photograph
m4_dnl
m4_dnl Usage: m4_thumbnail(basename,caption)
m4_dnl
m4_dnl Takes the base of the filename (without .jpg or _small.jpg).  
m4_dnl The optional caption is displayed underneath if supplied.
m4_dnl
m4_define([[m4_thumbnail]], m4_dnl
[[<A HREF="photos/$1[[]]m4_image_selector.jpg">
m4_local_image(photos/.thumbnails/$1_small.jpg,[[$1]],[[BORDER=0]])</A>
m4_ifelse(m4_eval($#>=2), [[0]], [[]], [[
$2 ]])m4_dnl
]])m4_dnl
m4_dnl
m4_dnl Alternative version listing in a single column with comments (e.g. filenames)
m4_dnl
m4_dnl m4_define([[m4_thumbnail]], m4_dnl
m4_dnl [[m4_ifelse(m4_eval($#>=2), [[0]], [[]], [[<TABLE><TR><TD>]])
m4_dnl <A HREF="photos/$1[[]]m4_image_selector.jpg">
m4_dnl m4_local_image(photos/.thumbnails/$1.jpg,[[$1]],[[BORDER=2]])</A>
m4_dnl m4_ifelse(m4_eval($#>=2), [[0]], [[]], [[<TR><TD>
m4_dnl <font size=-2>$2</font></TABLE>]])m4_dnl
m4_dnl ]])m4_dnl


m4_dnl  Restore ability to generate output
m4_dnl
m4_divert[[]]m4_dnl
m4_dnl
m4_dnl Put warning at the top of generated files
<!-- This file generated using GNU m4; edit the m4 source file instead of this one. -->
