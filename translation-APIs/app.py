# Translate alphabet based text to braille.
from googletrans import Translator
from flask import Flask,request,jsonify
from languages import supported_languages
app = Flask(__name__) 
translator = Translator()
results = {'text' : '', 'src' : '', 'dest' : ''}


# GET request for the landing page
@app.route('/', methods=['GET'])
def test():
	return jsonify({'message' : 'Welcome to language translator',
                 'documentation' : 'Documentation Link'})

# GET request to display all the languages with their respective codes
@app.route('/languages', methods=['GET'])
def returnAll():
    return jsonify({'available languages' : supported_languages})

@app.route('/translate', methods=['POST'])
def addOne():
    text = request.form['text']
    dest = request.form['dest']

    src = translator.detect(text).lang
    results = {'text' : text, 'src' : src, 'dest' : dest}
    translate = translator.translate(text, src=src, dest=dest)
    translated = translate.text
    results['translated'] = translated
    print(results)
    return jsonify({'result' : results})

if __name__ == '__main__':
	app.run(debug=True, port=8080) #run app on port 8080 in debug mode


