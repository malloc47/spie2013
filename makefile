proj = spie2013

all: $(proj).pdf

$(proj).pdf: *.tex *.bib # fig/*.fig
	pdflatex $(proj) 
	bibtex $(proj) 
	pdflatex $(proj) 
	pdflatex $(proj) 

# $(proj).pdf:$(proj).ps
# 	ps2pdf $(proj).ps

# $(proj).ps:$(proj).dvi
# 	dvips -t letter $(proj).dvi -o $(proj).ps

# $(proj).dvi: *.tex *.bib
# 	latex $(proj)
# 	-bibtex $(proj)
# 	latex $(proj)
# 	latex $(proj)

view:
	evince $(proj).pdf &

deploy:
	cd .. ; tar -czhv --exclude=.* -f $(proj).tar.gz $(proj)/
	cp ../$(proj).tar.gz ~/tmp/forSong/
	cp $(proj).pdf ~/tmp/forSong/
	scp $(proj).pdf eos:~/public_html/papers/


clean:
	-rm *.aux *.bbl *.blg *.brf *.log *~ $(proj).{pdf,ps,dvi}
