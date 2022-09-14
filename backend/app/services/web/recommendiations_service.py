import types

from aiocache import cached

recommendation_types = types.SimpleNamespace()

recommendation_types.SERVICES_WIDGET: int = 1
recommendation_types.TRAINING_WIDGET: int = 2
recommendation_types.PUBLICATION_WIDGET: int = 3
recommendation_types.DATASET_WIDGET: int = 4
recommendation_types.SOFTWARE_WIDGET: int = 5


def mock(widget_type: int = 1):
    match widget_type:
        case recommendation_types.SERVICES_WIDGET:
            json = [
                {
                    "title": "Occurrences DataCube Analyst",
                    "description": "Cross your datacube with geographic layers",
                    "organisation": "LifeWatch ERIC",
                    "url": (
                        "https://marketplace.eosc-portal.eu/services/"
                        "occurrences-datacube-analyst?from_recommendation_panel=true"
                    ),
                },
                {
                    "title": "Extractor Resampler and Masking",
                    "description": (
                        "Extract the Deciduous Vegetation Layer from multiclass land"
                        " cover."
                    ),
                    "organisation": "LifeWatch ERIC",
                    "url": (
                        "https://marketplace.eosc-portal.eu/services/"
                        "extractor-resampler-and-masking?from_recommendation_panel=true"
                    ),
                },
                {
                    "title": "OpenEBench",
                    "description": (
                        "Produce and choose more efficient methods, "
                        "tools and web services by comparing their performance"
                    ),
                    "organisation": "Barcelona Supercomputing Center",
                    "url": (
                        "https://marketplace.eosc-portal.eu/services/"
                        "openebench?from_recommendation_panel=true"
                    ),
                },
            ]
        case recommendation_types.TRAINING_WIDGET:
            json = [
                {
                    "title": "Introduction to Persistent Identifiers",
                    "description": (
                        "As part of the DARIAH Friday Frontiers in-house webinar"
                        " series, Dr. Tibor Kálman (GWDG) gives an introduction to"
                        " Persistent Identifiers. Why do we need them, how do we apply"
                        " them, and how do (digital) arts and humanities scholars"
                        " benefit from them in particular? This webinar focuses on"
                        " 'Persistent Identifiers' (PIDs) and basic concepts of"
                        " referencing objects."
                    ),
                    "authors": ["Kálman, Tibor"],
                    "url": (
                        "https://campus.dariah.eu/resource/posts/"
                        "introduction-to-persistent-identifiers"
                    ),
                },
                {
                    "title": "R for Reproducible Scientific Analysis",
                    "description": (
                        "An introduction to R for non-programmers using gapminder data"
                        " The goal of this lesson is to teach novice programmers to"
                        " write modular code and best practices for using R for data"
                        " analysis."
                    ),
                    "authors": [
                        "Capes Gerard",
                        "Deppen Jacob",
                        "Jiménez Verónica",
                        "Pereyra Silvana",
                        "Salgado Heladia",
                    ],
                    "url": "https://training-toolkit.sshopencloud.eu/item/528",
                },
                {
                    "title": "Finding and reusing data",
                    "description": (
                        "This webinar is intended for everyone who wants to learn about"
                        " ways of finding and reusing research data. Managing your"
                        " research data in a FAIR and transparent manner is important."
                    ),
                    "authors": [],
                    "url": (
                        "https://campus.dariah.eu/resource/posts/"
                        "introduction-to-persistent-identifiers"
                    ),
                },
            ]
        case recommendation_types.PUBLICATION_WIDGET:
            json = [
                {
                    "title": (
                        "A generalization of the alcove model and its applications"
                    ),
                    "description": (
                        "The alcove model of the first author and Postnikov describes"
                        " highest weight crystals of semisimple Lie algebras. We"
                        " present a generalization, called the quantum alcove model,"
                        " and conjecture that it uniformly describes tensor products of"
                        " column shape Kirillov-Reshetikhin crystals, for all untwisted"
                        " affine types."
                    ),
                    "authors": ["Lenart", "Cristian", "Lubovsky", "Arthur"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=06cdd3ff4700"
                        "::535338b9ae30bc9e9eda378637dafdb4"
                    ),
                },
                {
                    "title": (
                        "On the Complexity of Equivalence and Minimisation for"
                        " Q-weighted Automata"
                    ),
                    "description": (
                        "This paper is concerned with the computational complexity of"
                        " equivalence andminimisation for automata with transition"
                        " weights in the field Q of rationalnumbers. We use polynomial"
                        " identity testing and the Isolation Lemma to obtaincomplexity"
                        " bounds, focussing on the class NC of problems within P"
                        " solvable inpolylogarithmic parallel time."
                    ),
                    "authors": [
                        "Kiefer, Stefan",
                        "Murawski, Andrzej",
                        "Ouaknine, Joel",
                        "Wachter, Bjoern",
                        "Worrell, James",
                    ],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=06cdd3ff4700"
                        "::56bff895d0ecb8a2e6543f02afc016ca"
                    ),
                },
                {
                    "title": "On Greedy Trie Execution",
                    "description": (
                        "In the paper 'How to select' a looser Prodinger was analyzing"
                        " an algorithm where $n$ participants are selecting a leader by"
                        " flipping <underline>fair</underline> coins, where"
                        " recursively, the 0-party (those who i.e. have tossed heads)"
                        " continues until the leader is chosen. We give an answer to"
                        " the question stated in the Prodinger's paper"
                    ),
                    "authors": ["Gołębiewski, Zbigniew", "Zagórski, Filip"],
                    "url": (
                        "https://campus.dariah.eu/resource/posts/"
                        "introduction-to-persistent-identifiers"
                    ),
                },
            ]
        case recommendation_types.DATASET_WIDGET:
            json = [
                {
                    "title": (
                        "Immigration et diversité ethnoculturelle – Faits saillants en"
                        " tableaux"
                    ),
                    "description": (
                        "Provides information highlights by topic via key indicators"
                        " for various levels of geography. Fournissent des"
                        " renseignements ciblés à l'aide d'indicateurs clés par thème,"
                        " pour divers niveaux géographiques."
                    ),
                    "authors": ["Statistics Canada | Statistique Canada"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=475c1990cbb2"
                        "::0148af71685d107c8bebf19c8403e945"
                    ),
                },
                {
                    "title": (
                        "Ontario egg supply and disposition Œufs de l'Ontario :"
                        " disponibilité et écoulement"
                    ),
                    "description": (
                        "Get statistical data on supply and disposition of egg in"
                        " Ontario. Obtenez des données statistiques sur la"
                        " disponibilité et l'écoulement des œufs en Ontario."
                    ),
                    "authors": ["Agriculture, Food and Rural Affairs"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=475c1990cbb2"
                        "::024ebcb22b6b0e81781d76a325880710"
                    ),
                },
                {
                    "title": "Property Assessment Units Unités d'évaluation foncière",
                    "description": (
                        "Geospatial vector data of the division of properties in the"
                        " Greater Montreal area containing general information on"
                        " property assessment units, including usage codification"
                        " (CUBF), approximate dimensions and number number. IMPORTANT:"
                        " This cutting has no legal value and should not be confused"
                        " with cadastral cutting."
                    ),
                    "authors": ["Service de l'évaluation foncière"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=475c1990cbb2"
                        "::086cded695c963dc5e0ece93a42e31a1"
                    ),
                },
            ]
        case recommendation_types.SOFTWARE_WIDGET:
            json = [
                {
                    "title": "Prokaryote RNA sequence analysis workflow",
                    "description": (
                        "Galaxy workflow for the analysis of differential "
                        "expressed genes between two prokaryote transcriptome datasets."
                    ),
                    "authors": [
                        "Raknes, Alexander",
                        "Hjerde, Erik",
                        "Raknes, Alexande",
                    ],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=__bioTools__"
                        "::1dff816ddde6b1e231d299f10c115e3a"
                    ),
                },
                {
                    "title": "iLearn",
                    "description": (
                        "Integrated platform and meta-learner for feature engineering,"
                        " machine-learning analysis and modeling of DNA, RNA and"
                        " protein sequence data."
                    ),
                    "authors": ["Chen, Zhen", "Song, Jiangning"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=__bioTools__"
                        "::3223c90e8eb0c55641fae6602bfd1f30"
                    ),
                },
                {
                    "title": "SAPHIR",
                    "description": (
                        "SAPHIR (Shiny Analytical Plot of Histological Image Results)"
                        " is a Shiny application to analyze tissue section images."
                    ),
                    "authors": ["Germani, Elodie"],
                    "url": (
                        "https://explore.eosc-portal.eu/search/result?id=__bioTools__"
                        "::3b4c61ca37b5453565f851732bfb1ee7"
                    ),
                },
            ]
    return json


class RecommendationsService:
    @staticmethod
    @cached(ttl=10)
    async def fetch(widget_type: int = 1):
        # match type:
        #     case SERVICES_WIDGET:
        #         url = f"{SERVICE_RECOMMENDATIONS_URL}"
        #     case TRAINING_WIDGET:
        #         url = f"{TRAINING_RECOMMENDATIONS_URL}"
        #     case PUBLICATION_WIDGET:
        #         url = f"{PUBLICATION_RECOMMENDATIONS_URL}"
        #     case DATASET_WIDGET:
        #         url = f"{DATASET_RECOMMENDATIONS_URL}"
        #     case SOFTWARE_WIDGET:
        #         url = f"{SOFTWARE_RECOMMENDATIONS_URL}"
        #
        # async with httpx.AsyncClient() as client:
        response = mock(widget_type)
        return response
