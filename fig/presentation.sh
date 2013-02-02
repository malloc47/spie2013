#!/bin/bash
make dd.png
inkscape --without-gui --export-dpi=300 --export-png p-aaa.png aaa.svg 
inkscape --without-gui --export-dpi=300 --export-png p-bbb.png bbb.svg 
inkscape --without-gui --export-dpi=300 --export-png p-cca.png cca.svg 
inkscape --without-gui --export-dpi=300 --export-png p-ccf.png ccf.svg 
inkscape --without-gui --export-dpi=300 --export-png p-ccg.png ccg.svg 
inkscape --without-gui --export-dpi=300 --export-png p-ccb.png ccb.svg 
convert -density 150 -trim eval.pdf -quality 100 eval.png
convert -density 150 -trim eval_time.pdf -quality 100 eval_time.png
convert -density 150 -trim eval_f.pdf -quality 100 eval_f.png
