import os
from typing import Literal
from urllib.parse import urlparse

from starlette.config import Config
from starlette.datastructures import Secret

config = Config(environ=os.environ)
IS_TESTING = config("TESTING", cast=bool, default=False)

# APP SETUP
PROJECT_NAME = "EOSC Profile Service"
VERSION = "0.0.1"
SECRET_KEY = config("SECRET_KEY", cast=Secret, default="CHANGEME")
DATABASE_URI = config(
    "DATABASE_URI",
    cast=str,
    default="postgresql+psycopg2://user-dashboard:user-dashboard@localhost:5432/user-dashboard",
)

# SERVICES URLs
BACKEND_BASE_URL = config("BACKEND_BASE_URL", cast=str, default="http://localhost:8000")
UI_BASE_URL = config("UI_BASE_URL", cast=str, default="https://localhost:4200/")
FEEDS_BASE_URL = config(
    "FEEDS_BASE_URL", cast=str, default="https://eosc-portal.eu/news-json-date"
)
SERVICE_FAVOURITES_URL = config("SERVICE_FAVOURITES_URL", cast=str, default="")
SERVICE_RECOMMENDATIONS_URL = config(
    "SERVICE_RECOMMENDATIONS_URL", cast=str, default=""
)
TRAINING_RECOMMENDATIONS_URL = config(
    "TRAINING_RECOMMENDATIONS_URL", cast=str, default=""
)
PUBLICATION_RECOMMENDATIONS_URL = config(
    "PUBLICATION_RECOMMENDATIONS_URL", cast=str, default=""
)
DATASET_RECOMMENDATIONS_URL = config(
    "DATASET_RECOMMENDATIONS_URL", cast=str, default=""
)
SOFTWARE_RECOMMENDATIONS_URL = config(
    "SOFTWARE_RECOMMENDATIONS_URL", cast=str, default=""
)
ORDERED_SERVICES_URL = config("ORDERED_SERVICES_URL", cast=str, default="")
USER_PROJECTS_URL = config("USER_PROJECTS_URL", cast=str, default="")

# PROVIDERS RIGHTS
GLOBAL_ACCESS_FIELDS = [
    "favorites.services",
    "favorites.projects",
    "favorites.trainings",
]

# OIDC
OIDC_HOST = config("OIDC_HOST", cast=str, default="https://aai-demo.eosc-portal.eu")
OIDC_AAI_NEW_API = config("OIDC_AAI_NEW_API", cast=bool, default=False)
OIDC_ISSUER = config(
    "OIDC_ISSUER",
    cast=str,
    default=f"{OIDC_HOST}{'/auth/realms/core' if OIDC_AAI_NEW_API else '/oidc/'}",
)
OIDC_CLIENT_ID = config("OIDC_CLIENT_ID", cast=str, default="NO_CLIENT_ID")
OIDC_CLIENT_SECRET = config("OIDC_CLIENT_SECRET", cast=str, default="NO_CLIENT_SECRET")

STOMP_HOST = config("STOMP_HOST", cast=str, default="127.0.0.1")
STOMP_PORT = config("STOMP_PORT", cast=int, default="61613")
STOMP_LOGIN = config("STOMP_LOGIN", cast=str, default="guest")
STOMP_PASS = config("STOMP_PASS", cast=str, default="guest")
STOMP_USER_ACTIONS_TOPIC = config(
    "ESS_STOMP_USER_ACTION", cast=str, default="/topic/user_actions"
)
STOMP_RECOMMENDATIONS_TOPIC = config(
    "ESS_STOMP_RECOMMENDATIONS_TOPIC", cast=str, default="/topic/recommendations_evaluation"
)
STOMP_CLIENT_NAME = config("ESS_QUEUE_CLIENT_NAME", cast=str, default="dev-client")
STOMP_SSL = config("ESS_STOMP_SSL", cast=bool, default=False)


OIDC_NEW_AUTH_ENDPOINT = "/auth/realms/core/protocol/openid-connect/auth"
OIDC_OLD_AUTH_ENDPOINT = "/oidc/authorize"
OIDC_AUTH_ENDPOINT = OIDC_OLD_AUTH_ENDPOINT
if OIDC_AAI_NEW_API:
    OIDC_AUTH_ENDPOINT = OIDC_NEW_AUTH_ENDPOINT

OIDC_NEW_TOKEN_ENDPOINT = "/auth/realms/core/protocol/openid-connect/token"
OIDC_OLD_TOKEN_ENDPOINT = "/oidc/token"
OIDC_TOKEN_ENDPOINT = OIDC_OLD_TOKEN_ENDPOINT
if OIDC_AAI_NEW_API:
    OIDC_TOKEN_ENDPOINT = OIDC_NEW_TOKEN_ENDPOINT

OIDC_NEW_USERINFO_ENDPOINT = "/auth/realms/core/protocol/openid-connect/userinfo"
OIDC_OLD_USERINFO_ENDPOINT = "/oidc/userinfo"
OIDC_USERINFO_ENDPOINT = OIDC_OLD_USERINFO_ENDPOINT
if OIDC_AAI_NEW_API:
    OIDC_USERINFO_ENDPOINT = OIDC_NEW_USERINFO_ENDPOINT

# pylint: disable=R1735
OIDC_CLIENT_OPTIONS = client_options = dict(
    issuer=OIDC_ISSUER,
    client_id=OIDC_CLIENT_ID,
    client_secret=OIDC_CLIENT_SECRET,
    behaviour=dict(
        application_name="user_profile_service",
        application_type="web",
        response_types=["code"],
        scope=["openid", "profile", "email"],
        token_endpoint_auth_method=["client_secret_basic", "client_secret_post"],
    ),
    provider_info=dict(
        authorization_endpoint=f"{OIDC_HOST}{OIDC_AUTH_ENDPOINT}",
        token_endpoint=f"{OIDC_HOST}{OIDC_TOKEN_ENDPOINT}",
        userinfo_endpoint=f"{OIDC_HOST}{OIDC_USERINFO_ENDPOINT}",
    ),
    redirect_uris=[f"{BACKEND_BASE_URL}/api/web/auth/checkin"],
    post_logout_redirect_uri=f"{BACKEND_BASE_URL}/auth/logout",
    backchannel_logout_uri=f"{BACKEND_BASE_URL}/auth/logout",
    backchannel_logout_session_required=True,
)

parsed_url = urlparse(BACKEND_BASE_URL)
OIDC_CONFIG = dict(
    port=parsed_url.port if parsed_url.port else None,
    domain=f"{parsed_url.scheme}://{parsed_url.netloc}",
    base_url=f"{parsed_url.scheme}://{parsed_url.netloc}",
    httpc_params=dict(verify=False),
    services=dict(
        discovery={
            "class": "oidcrp.oidc.provider_info_discovery.ProviderInfoDiscovery",
            "kwargs": {},
        },
        registration={"class": "oidcrp.oidc.registration.Registration", "kwargs": {}},
        authorization={
            "class": "oidcrp.oidc.authorization.Authorization",
            "kwargs": {},
        },
        accesstoken={"class": "oidcrp.oidc.access_token.AccessToken", "kwargs": {}},
        userinfo={"class": "oidcrp.oidc.userinfo.UserInfo", "kwargs": {}},
        end_session={"class": "oidcrp.oidc.end_session.EndSession", "kwargs": {}},
    ),
)

OIDC_NEW_JWKS_ENDPOINT = "/auth/realms/core/protocol/openid-connect/certs"
OIDC_OLD_JWKS_ENDPOINT = "/oidc/jwk"
OIDC_JWKS_ENDPOINT = OIDC_OLD_JWKS_ENDPOINT
if OIDC_AAI_NEW_API:
    OIDC_JWKS_ENDPOINT = OIDC_NEW_JWKS_ENDPOINT

OIDC_JWT_ENCRYPT_CONFIG = dict(
    public_path=f"{OIDC_HOST}{OIDC_JWKS_ENDPOINT}",
    key_defs=[
        {"type": "RSA", "use": ["sig"]},
    ],
    issuer_id=OIDC_ISSUER,
    read_only=True,
)
OIDC_CONFIG["clients"] = {}
OIDC_CONFIG["clients"][OIDC_ISSUER] = OIDC_CLIENT_OPTIONS

parsed_url = urlparse(UI_BASE_URL)
AUTH_COOKIES_CONFIG = dict(
    domain=parsed_url.hostname,
    max_age=24 * 60 * 60,  # 1 day
    cookie_name="_mp_service_auth",
    identifier="general_verifier",
    auto_error=True,
    secure=True,
    secret_key="DONOTUSE",
)

RECOMMENDER_ENDPOINT = config(
    "RECOMMENDER_ENDPOINT", cast=str, default="http://localhost:8081/recommendations"
)
RecommendationTypes = Literal[
    "all",
    "publication",
    "dataset",
    "software",
    "training",
    "service",
    "other",
    "data-source",
    "news",
]
SOLR_URL = config("SOLR_URL", cast=str, default="http://localhost:8983/solr/")
YOUTUBE_API_URL = config(
    "YOUTUBE_API_URL", cast=str, default="https://www.googleapis.com/youtube/v3/search"
)
YOUTUBE_API_KEY = config(
    "YOUTUBE_API_KEY", cast=str, default="AIzaSyAlLHVx3PSPvVnCUd7DL2wNsj_9UzLPTAk"
)
EOSC_EVENTS_API = config(
    "EOSC_EVENTS_API", cast=str, default="https://eosc-portal.eu/events-json-date/"
)
