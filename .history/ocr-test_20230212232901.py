import sys
from PIL import Image
import numpy as np
import cv2
import pytesseract


pytesseract.pytesseract.tesseract_cmd = 'D:\\Program Files\\Tesseract-OCR\\tesseract.exe'


def getTextFromImageTest():
    image = cv2.imread('image_01.jpg')
    text = pytesseract.image_to_string(image)
    return text


text = getTextFromImageTest()
print(text)

