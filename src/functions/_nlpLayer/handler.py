import numpy as np
import spacy
import json

nlp = spacy.load("en_core_web_sm")


def calculate_similarity(target, bios, size=5):
    similarity_scores = []
    for bio in bios:
        doc = nlp(bio["userData"])  # adjusting to new JSON structure
        similarity_score = doc.similarity(nlp(target))
        # Store both ID and score
        similarity_scores.append((bio["id"], similarity_score))

    sorted_bios = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Return the top bios with the highest similarity scores, including the user's ID and score
    top_bios = [{"id": bio_id, "score": score}
                for bio_id, score in sorted_bios[:size]]
    return top_bios


def nlpLayer(event, context):
    print("numpy", np.__version__, "spacy", spacy.__version__)
    request_body = json.loads(event["body"])

    user_list_data = request_body.get("userList", [])
    target_attribute = request_body.get("target")

    size = request_body.get("size", 5)
    top_matched_bios = calculate_similarity(
        target_attribute, user_list_data, size)

    print('>>>>> Spacy Score:', top_matched_bios)

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "status": "running layer ....",
            "[DEBUG] running numpy_version": np.__version__,
            "[DEBUG] running spacy": spacy.__version__,
            "recommendProfiles": top_matched_bios
        })
    }
