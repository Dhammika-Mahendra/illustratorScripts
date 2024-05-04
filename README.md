### Simple Adobe Illustrator script 
### (A radial pattern design) 


1. Simply download the file and Place it in the Illustrator script path
2. Run in Adobe Illustrator (File-> Script -> *this script file*)

### you can also change below designing parameters in the script file to customize the design

* **No of Colors in the color pallete**  
  var noCol

* **Color Range of the color pallete**  
 var minR - *Red minimum*  
 var maxR - *Red maximum*  
 var minG - *Green minimum*  
 var maxG - *Green maximum*  
 var minB - *Blue minimum*  
 var maxB - *Blue maximum*  

* **No of Conical Sections :**   
*these section are duplicated and rotated to get the final output*  
*a number that is a factor of 360 needed*  
 var sections

* **No of Lines per section :**  
*a conical section is a collection of randomly drawn lines*    
*more lines give a smoother design*  
 var MinLine  
 var MaxLine
