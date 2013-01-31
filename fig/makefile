SOURCES = $(wildcard *.fig)
SOURCES2 = $(wildcard *.svg)
PDF = $(SOURCES:.fig=.pdf)
PDF2 = $(SOURCES2:.svg=.pdf)

.SECONDARY:

all: $(PDF) $(PDF2)

%.pdf: %.eps
	epstopdf $<

%.eps: %.fig
	fig2dev -L eps -m 1.00 -c $< $@

%.pdf: %.svg
	inkscape --without-gui --export-pdf $@ $< 

%.png: %.svg
	inkscape --without-gui --export-png $@ $< 

%.eps: %.svg
	inkscape --without-gui --export-eps $@ $< 

clean:
	-rm $(PDF) $(PDF2)
	-rm *.bak
