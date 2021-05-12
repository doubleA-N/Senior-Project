from flask import Flask
from flask import request
from flask_cors import CORS
import pickle
import numpy as np
import pythainlp
from pythainlp.tokenize import word_tokenize
from pythainlp.corpus import thai_stopwords
from sklearn.feature_extraction.text import TfidfTransformer
from sklearn.decomposition import TruncatedSVD
import scipy.sparse as sp
from itertools import chain 
import pandas as pd
import xlrd

app = Flask(__name__)
CORS(app)

app = Flask(__name__,) #Initialize the flask App

data_tr = open('data_tr.pkl','rb')
data_cleaned_tr = pickle.load(data_tr)

data_dn = open('data_dn.pkl','rb')
data_cleaned_dn = pickle.load(data_dn)

dn_model = open('model_2model_dn.pkl','rb')
dnModel = pickle.load(dn_model)

tr_model = open('model_2model_tr.pkl','rb')
trModel = pickle.load(tr_model)

def text_to_bow(tokenized_text, vocabulary_):
    """ฟังก์ชันเพื่อแปลงลิสต์ของ tokenized text เป็น sparse matrix"""
    n_doc = len(tokenized_text)
    values, row_indices, col_indices = [], [], []
    for r, tokens in enumerate(tokenized_text):
        feature = {}
        for token in tokens:
            word_index = vocabulary_.get(token)
            if word_index is not None:
                if word_index not in feature.keys():
                    feature[word_index] = 1
                else:
                    feature[word_index] += 1
        for c, v in feature.items():
            values.append(v)
            row_indices.append(r)
            col_indices.append(c)
        #print(feature)

    # document-term matrix in sparse CSR format
    X = sp.csr_matrix((values, (row_indices, col_indices)),
                      shape=(n_doc, len(vocabulary_)))
    return X


vocabulary_dn = {v: k for k, v in enumerate(set(chain.from_iterable(data_cleaned_dn)))}
transformer_dn = TfidfTransformer()
svd_model_dn = TruncatedSVD(n_components=100,
                         algorithm='arpack', n_iter=100)

X = text_to_bow(data_cleaned_dn, vocabulary_dn)
X_tfidf = transformer_dn.fit_transform(X)
X_svd = svd_model_dn.fit_transform(X_tfidf)

df_dn = pd.read_excel('data_dn_train_label.xlsx')
tag_dn = pd.get_dummies(df_dn.news_cat).columns

def predict_dn(problem_dn): 
  tokenized_text = word_tokenize(problem_dn)
  x = text_to_bow([tokenized_text], vocabulary_dn)
  x_tfidf = transformer_dn.transform(x)
  x_svd = svd_model_dn.transform(x_tfidf)
  pred = [model.predict_proba(x_svd.reshape(-1, 1).T).ravel()[1] for model in dnModel]
#   tag = pd.get_dummies(df_dn.news_cat).columns
#   tag_predicted = list(zip(tag, pred))
  tag_predicted = tag_dn[np.argmax(pred)]
  return tag_predicted

def check_problem(check):
  
  topic = predict_dn(check)
  return topic

@app.route('/predict',methods=['GET','POST'])
def predict():
    '''
    For rendering results on HTML GUI
    '''   
    text =  request.json
    output = check_problem(text)
    return {'topic': output}

if __name__ == "__main__":
    app.run(debug=True)
