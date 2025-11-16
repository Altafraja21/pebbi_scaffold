from openai import OpenAI
client = OpenAI()

def detect_emotion(text: str):
    result = client.chat.completions.create(
        model="gpt-4.1-mini",
        messages=[
            {"role": "system", "content": "Analyze user's emotional tone. Respond only with emotions such as: happy, sad, angry, surprised, calm, excited, confused"},
            {"role": "user", "content": text}
        ]
    )
    emotion = result.choices[0].message.content.strip()
    return emotion
