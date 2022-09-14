from aiocache import cached


def mock():
    return [
        {
            "title": "Occurrences DataCube Analyst",
            "description": "Cross your datacube with geographic layers",
            "organisation": "LifeWatch ERIC",
            "url": "https://marketplace.eosc-portal.eu/services/occurrences-datacube-analyst",
        },
        {
            "title": "Extractor Resampler and Masking",
            "description": (
                "Extract the Deciduous Vegetation Layer from multiclass land cover."
            ),
            "organisation": "LifeWatch ERIC",
            "url": "https://marketplace.eosc-portal.eu/services/extractor-resampler-and-masking",
        },
        {
            "title": "OpenEBench",
            "description": (
                "Produce and choose more efficient methods, "
                "tools and web services by comparing their performance"
            ),
            "organisation": "Barcelona Supercomputing Center",
            "url": "https://marketplace.eosc-portal.eu/services/openebench",
        },
    ]


class FavouritesService:
    @staticmethod
    @cached(ttl=10)
    async def fetch():
        return mock()
