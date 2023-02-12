import sys
import pandas as pd


def getTextFromCSV():
    data = pd.read_csv (sys.argv[1])  
    csv_data =  data.to_json(orient='index')
    return  csv_data