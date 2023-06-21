# Importing Image class from PIL module
from PIL import Image
import os
 
# Opens a image in RGB mode
img = Image.open("./general Background Removed.png")

# Setting the points for cropped image
left = 284
top = 12
right = 424
bottom = 264

# Cropped image of above dimension
# (It will not change original image)
im1 = img.crop((left, top, right, bottom))

# Shows the image in image viewer
# im1.show()

im1.save("prepped/general Background Removed"+str(".png"))