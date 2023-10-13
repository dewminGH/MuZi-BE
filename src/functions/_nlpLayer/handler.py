import numpy as np
import spacy as spaCy
import json

nlp = spaCy.load("en_core_web_sm")

# Initialize spaCy with your specific language model
# nlp = spacy.load("your_spacy_language_model")


def calculate_similarity(target, bios):
    # Load the spaCy model (you might want to do this outside the function for efficiency)
    # nlp = spacy.load("your_spacy_language_model")

    # Calculate similarity scores for each bio
    similarity_scores = []
    for bio in bios:
        doc = nlp(bio)
        similarity_score = doc.similarity(nlp(target))
        similarity_scores.append((bio, similarity_score))

    # Sort the bios by similarity score in descending order
    sorted_bios = sorted(similarity_scores, key=lambda x: x[1], reverse=True)

    # Return the top 3 bios with the highest similarity scores
    top_3_bios = [bio for bio, score in sorted_bios[:3]]

    return top_3_bios

##########################################


def nlpLayer(event, context):
    print("numpy", np.__version__, "spacy")
    # Example: Using numpy and spaCy

    request_body = json.loads(event["body"])

    # Access the "bios" attribute from the JSON data
    bios_data = request_body.get("bios", [])

    target_attribute = request_body.get("target")

    top_3_matched_bios = calculate_similarity(target_attribute, bios_data)

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
            "[DEBUG] running spacy": spaCy.__version__,
            "recommend profiles": top_3_matched_bios
        })
    }
