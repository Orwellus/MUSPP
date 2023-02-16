import sys
from PIL import Image
import numpy as np
import cv2
import pytesseract
pytesseract.pytesseract.tesseract_cmd = 'D:\\Program Files\\Tesseract-OCR\\tesseract.exe'

def getImageOnly(file):
     image = cv2.imread(file)
     return image

def getImageWithProcessing(file):
    image = cv2.imread(file)
    scale_percent = 60  # percent of original size
    width = int(image.shape[1] * scale_percent / 100)
    height = int(image.shape[0] * scale_percent / 100)
    dim = (width, height)
    resized = cv2.resize(image, dim, interpolation=cv2.INTER_AREA)
    image = resized
    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_blue = np.array([100, 50, 50])
    upper_blue = np.array([150, 255, 255])
    kernel = np.ones((5, 5), np.uint8)
    mask = cv2.inRange(hsv, lower_blue, upper_blue)
    mask = cv2.dilate(mask, kernel, iterations=1)
    dst = cv2.inpaint(image, mask, 3, cv2.INPAINT_TELEA)
    return mask

def getTextFromImage():
    img = getImageWithProcessing(sys.argv[1])
    text = pytesseract.image_to_string(img)
    return text

def getTextFromImage2():
    img = getImageOnly(sys.argv[1])
    text = pytesseract.image_to_string(img)
    return text


text = getTextFromImage()
print(text)
if len(text) == 0:
    text = getTextFromImage2()
print(text)