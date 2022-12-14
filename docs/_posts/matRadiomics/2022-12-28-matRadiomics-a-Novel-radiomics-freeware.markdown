---
layout: post
title:  "matRadiomics: a Novel Radiomics Freeware!"
category: matRadiomics
image: /assets/img/matRadiomics/matRadiomics_logo_large.png
description: >
  matRadiomics is a complete radiomics freeware that allows the user to complete
  the whole radiomics workflow, from image visualization to predictive model implementation. It enables a simplified workflow for medical image processing and analysis.

author: gio
---
<head>
<link rel="stylesheet" href="/styles/iframe.css">
</head>

<blockquote class="twitter-tweet" data-lang="en" data-theme="dark" data-align="center"><p lang="en" dir="ltr">1) matRadiomics is a freeware that allows the user to carry out the whole radiomics workflow.<br>It was presented for the first time in a research paper published in the Journal of Imaging. <a href="https://twitter.com/MDPIOpenAccess?ref_src=twsrc%5Etfw">@MDPIOpenAccess</a><br><br>Paper available in the comments below.<a href="https://twitter.com/hashtag/radiomics?src=hash&amp;ref_src=twsrc%5Etfw">#radiomics</a> <a href="https://t.co/ZlMFm7GlN8">https://t.co/ZlMFm7GlN8</a></p>&mdash; Giovanni Pasini (@research_giovap) <a href="https://twitter.com/research_giovap/status/1595725148526624768?ref_src=twsrc%5Etfw">November 24, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
---

# Introduction

Currently, the most popular radiomics software, like [Slicer3D](https://www.slicer.org/) and [LIFEx](https://www.lifexsoft.org/), stop at the feature extraction level, not allowing to perform feature selection and predictive model bulding within the same software. Therefore, the user either needs to switch to another software or needs to know how to code, in order to continue with the radiomics workflow.  

On the other end, **[matRadiomics](https://doi.org/10.3390/jimaging8080221)**, a novel and complete radiomics freeware written in MATLAB and Python, allows the user to perform all the steps of a radiomics workflow:
1. **Image importing and visualization**
2. **[Segmentation](https://en.wikipedia.org/wiki/Image_segmentation)**
3. **[Feature extraction](https://en.wikipedia.org/wiki/Feature_extraction)**
4. **[Feature selection](https://en.wikipedia.org/wiki/Feature_selection)**
5. **Predictive model building**

#### Attention
matRadiomics is currently a research product, and it is still under development.


# Installation and Functionalities

The installation procedure and the main functionalities of matRadiomics are explained in some video tutorials available on the **[IBFM-CNR Youtube Channel](https://www.youtube.com/channel/UCt1qA1rFe5vmsgTN4r4TJ-g)**

- **Installation**  

This video tutorial focuses on the installation procedure of matRadiomics. Currently, it works only on Windows 10/11.
<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/6xhUk8ClxBw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
--- 

- **Import DICOM, Segment and Extract Features**  

This video tutorial focuses on how to import DICOM files, how to segment images and how to extract features using **[pyradiomics](https://pyradiomics.readthedocs.io/en/latest/index.html#)**, for which matRadiomics provides a graphical user interface.
<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/ONGb02CfkxA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
</div>
---

- **Access DICOM attributes, Import Segmentations, Feature Selection**  

This video tutorial focuses on how to access DICOM files attributes, how to import DICOM segmentation and how to perform feature selection.
<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/UgvnREn4ytI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
---

- **Build and Save a Machine Learning Model**  

This tutorial focuses on how to train a Machine learning model and evaluate its performance (accuracy, AUC, Confusion Matrix)
<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/kCODnuTwyGA" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>  
</div>
---

- **Feature harmonization, Manual Segmentation, Switch between segmentations**  

This tutorial focuses on how to perform feature harmonization ([ComBat package](https://github.com/Jfortin1/ComBatHarmonization)), how to perform manual segmentation of images (draw and erase tool) and how to switch between multiple segmentations.
<div class="iframe-container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/wNCKSkKWGmU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
---



