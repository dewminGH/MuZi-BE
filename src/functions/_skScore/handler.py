import json
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def calculate_tfidf_cosine_similarity(target, bios_texts):
    if not target or not bios_texts:
        return []

    texts = bios_texts + [target]
    tfidf = TfidfVectorizer(stop_words='english').fit_transform(texts)
    cosine_similarities = cosine_similarity(tfidf[-1], tfidf[:-1]).flatten()
    return cosine_similarities


def sklearnHandler(event, context):
    request_body = json.loads(event["body"])
    user_list_data = request_body.get("userList", [])
    target_attribute = request_body.get("target")
    size = request_body.get("size", 5)

    bios_texts = [bio["userData"] for bio in user_list_data]
    tfidf_cosine_similarities = calculate_tfidf_cosine_similarity(
        target_attribute, bios_texts)

    # Check if all values in the array are close to zero
    if not tfidf_cosine_similarities.any():
        return {
            "statusCode": 400,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            },
            "body": json.dumps({
                "status": "Error: Empty target attribute or bios list.",
                "recommendProfiles": []
            })
        }

    # Extract IDs and pair them with their corresponding similarity scores
    similarity_scores = [(bio["id"], score) for bio, score in zip(
        user_list_data, tfidf_cosine_similarities)]

    # Sort bios based on similarity scores and extract top N bios
    sorted_bios = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    top_bios = [{"id": bio_id, "score": score}
                for bio_id, score in sorted_bios[:size]]

    return {
        "statusCode": 200,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "body": json.dumps({
            "status": "running sklearn handler ...",
            "recommendProfiles": top_bios
        })
    }
