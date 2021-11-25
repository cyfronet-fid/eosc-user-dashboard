from pydantic import BaseModel


class RecommendedResourceResponse(BaseModel):
    label: str
    rating: int
    description: str
    organisation: str
