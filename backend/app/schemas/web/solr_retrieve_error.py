from app.schemas.web.recommendation_http_error import RecommendationHttpError


class SolrRetrieveError(RecommendationHttpError):
    """Error with retrieving data from SOLR"""

    def __repr__(self):
        return f"[SOLR] {super().__repr__()}"

    def __str__(self):
        return self.__repr__()
