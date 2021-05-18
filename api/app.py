from flask import Flask, jsonify
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
import re
from bs4 import BeautifulSoup
import requests

app = Flask(__name__, static_url_path='/',static_folder='./build') #Initialize the flask App
CORS(app)

data_tr = open('model/data_tr.pkl','rb')
data_cleaned_tr = pickle.load(data_tr)

data_dn = open('model/data_dn.pkl','rb')
data_cleaned_dn = pickle.load(data_dn)

data_one = open('one_old/data_one.pkl','rb')
data_cleaned_one = pickle.load(data_one)

tr_model = open('model/model_tr.pkl','rb')
trModel = pickle.load(tr_model)

dn_model = open('model/model_dn.pkl','rb')
dnModel = pickle.load(dn_model)

one_model = open('one_old/model_one.pkl','rb')
oneModel = pickle.load(one_model)

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


## Daily News
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
  # tag_predicted = tag_tr[np.argmax(pred)]
  tag = pd.get_dummies(df_dn.news_cat).columns
  tag_predicted = list(zip(tag, pred))
  return tag_predicted


## Thairath
vocabulary_tr = {v: k for k, v in enumerate(set(chain.from_iterable(data_cleaned_tr)))}
transformer_tr = TfidfTransformer()
svd_model_tr = TruncatedSVD(n_components=100,
                         algorithm='arpack', n_iter=100)

X = text_to_bow(data_cleaned_tr, vocabulary_tr)
X_tfidf = transformer_tr.fit_transform(X)
X_svd = svd_model_tr.fit_transform(X_tfidf)

df_tr = pd.read_excel('data_train_labeled.xlsx')
tag_tr = pd.get_dummies(df_tr.news_cat).columns

def predict_tr(problem_tr): 
  tokenized_text = word_tokenize(problem_tr)
  x = text_to_bow([tokenized_text], vocabulary_tr)
  x_tfidf = transformer_tr.transform(x)
  x_svd = svd_model_tr.transform(x_tfidf)
  pred = [model.predict_proba(x_svd.reshape(-1, 1).T).ravel()[1] for model in trModel]
  # tag_predicted = tag_tr[np.argmax(pred)]
  tag = pd.get_dummies(df_tr.news_cat).columns
  tag_predicted = list(zip(tag, pred))
  return tag_predicted

## One31
vocabulary_one = {v: k for k, v in enumerate(set(chain.from_iterable(data_cleaned_one)))}
transformer_one = TfidfTransformer()
svd_model_one = TruncatedSVD(n_components=100,
                         algorithm='arpack', n_iter=100)

X = text_to_bow(data_cleaned_tr, vocabulary_one)
X_tfidf = transformer_one.fit_transform(X)
X_svd = svd_model_one.fit_transform(X_tfidf)

df_one = pd.read_excel('data_one_labeled.xlsx')
tag_one = pd.get_dummies(df_one.news_cats).columns

def predict_one(problem_one): 
  tokenized_text = word_tokenize(problem_one)
  x = text_to_bow([tokenized_text], vocabulary_one)
  x_tfidf = transformer_one.transform(x)
  x_svd = svd_model_one.transform(x_tfidf)
  pred = [model.predict_proba(x_svd.reshape(-1, 1).T).ravel()[1] for model in oneModel]
  # tag_predicted = tag_tr[np.argmax(pred)]
  tag = pd.get_dummies(df_one.news_cats).columns
  tag_predicted = list(zip(tag, pred))
  return tag_predicted

## Prediction
class TopicPredictor():
  settings = {}
  tag = []
  def __init__(self, settings, tag):
    self.settings = settings
    self.tag = tag

  def predict(self, input, method="vote", withTag=True):
    if method=="vote":
      methods = [i for i in settings]
      results = [self._predict(input, method, withTag=False) for method in methods]
      voters = np.zeros(len(self.tag))
      for result in results:
        vote = np.argmax(result)
        voters[vote] += 1
      winner = self.tag[np.argmax(voters)]
      return winner

    if method=="mul":
      methods = [i for i in settings]
      results = [self._predict(input, method, withTag=False) for method in methods]
      mul_result = np.ones(len(self.tag))
      for result in results:
        mul_result *= np.array(result)
      winner = self.tag[np.argmax(mul_result)]
      return  winner

    elif method=="all":
      methods = [i for i in settings]
      results = [self._predict(input, method, withTag) for method in methods]
      return methods, results

    else:
      return self._predict(input, method, withTag)
    
  def _predict(self, input, method, withTag=True):
    tokenized_text = word_tokenize(input)
    x = text_to_bow([tokenized_text], self.settings[method]['vocabulary'])
    x_tfidf = self.settings[method]['transformer'].transform(x)
    x_svd = self.settings[method]['svd'].transform(x_tfidf)
    pred = [model.predict_proba(x_svd.reshape(-1, 1).T).ravel()[1] for model in self.settings[method]['model']]
    ret = pred
    if withTag:
      ret = list(zip(self.tag, pred))
    return ret

tag = list(pd.get_dummies(df_tr.news_cat).columns)
settings = {
  'dn': {'vocabulary': vocabulary_dn, 'transformer': transformer_dn, 'model': dnModel, 'svd': svd_model_dn},
  'tr': {'vocabulary': vocabulary_tr, 'transformer': transformer_tr, 'model': trModel, 'svd': svd_model_tr},
  'one': {'vocabulary': vocabulary_one, 'transformer': transformer_one, 'model': oneModel, 'svd': svd_model_one}
}

tp = TopicPredictor(settings, tag)

@app.route('/predict', methods=['GET','POST'])

def predict():
    '''
    For rendering results on HTML GUI
    '''   
    text =  request.json
    output = tp.predict( text, method='vote')
    return jsonify(output=output,text=text)

@app.route('/')
def hello():
    return "hello newbie python"

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)
