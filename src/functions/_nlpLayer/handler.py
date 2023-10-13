import numpy as np
import spacy
import json

nlp = spacy.load("en_core_web_sm")


def calculate_similarity(target, bios):
    similarity_scores = []
    for bio in bios:
        doc = nlp(bio["userData"])  # adjusting to new JSON structure
        similarity_score = doc.similarity(nlp(target))
        similarity_scores.append((bio, similarity_score))

    sorted_bios = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Return the top 3 bios with the highest similarity scores, maintaining the user's ID
    top_3_bios = [{"id": bio["id"], "userData": bio["userData"]}
                  for bio, score in sorted_bios[:3]]

    return top_3_bios

##########################################


def nlpLayer(event, context):
    print("numpy", np.__version__, "spacy", spacy.__version__)
    request_body = json.loads(event["body"])
    # adjusting to new JSON structure
    user_list_data = request_body.get("userList", [])
    target_attribute = request_body.get("target")

    top_3_matched_bios = calculate_similarity(target_attribute, user_list_data)

    print(top_3_matched_bios)

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
            "recommend profiles": top_3_matched_bios
        })
    }
