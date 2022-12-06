class RecommendationHttpError(Exception):
    """Error with external services used during recommendation serving"""

    def __init__(self, message: str, http_status: int | None = None, data: dict = ...):
        self.message = message
        self.http_status = http_status
        self.data = {} if data is ... else data

    def __repr__(self):
        return f"{self.message}" + (
            f" [{self.http_status}]" if self.http_status else ""
        )

    def __str__(self):
        return self.__repr__()
