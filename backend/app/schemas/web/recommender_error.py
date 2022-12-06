from app.schemas.web.recommendation_http_error import RecommendationHttpError


class ExternalRecommenderError(RecommendationHttpError):
    """Error with recommender"""

    def __repr__(self):
        return f"[Recommender] {super().__repr__()}"
