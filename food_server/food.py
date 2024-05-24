from flask import Flask, jsonify, request
import anthropic
import base64
import httpx
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

api_key = "your-api-key"
client = anthropic.Anthropic(api_key=api_key)

@app.route('/describe_vegetable', methods=['POST'])
def describe_vegetable():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # Read image content
    image_content = file.read()

    # Convert image content to base64
    image_content_base64 = base64.b64encode(image_content).decode("utf-8")

    # Prepare API request
    image_media_type = "image/jpeg"
    message = client.messages.create(
        model="claude-3-opus-20240229",
        max_tokens=1024,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": image_media_type,
                            "data": image_content_base64,
                        },
                    },
                    {
                        "type": "text",
                        "text": "give name, condition, shelf_life, and give 3 recipes consisting of recipename, ingredients, instructions, and calories give the data in json format.just give the direct prompted data without any other messages included"
                    }
                ],
            }
        ],
    )

    
    response_data=message.content[0].text  
    response_data= response_data.replace('\n', ' ')
    response_data= response_data.replace('\ ', ' ')
    return (response_data)


if __name__ == '__main__':
    app.run(debug=True)
